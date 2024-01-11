const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      private: true, // used by the toJSON plugin
    },
    info: {
      firstName: {
        type: String,
        trim: true,
        default: "",
      },
      middleName: {
        type: String,
        trim: true,
        default: "",
      },
      lastName: {
        type: String,
        trim: true,
        default: "",
      },
      phoneNumber: {
        type: Number,
        minlength: 10,
      },
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.virtual("info.fullName").get(function () {
  const { firstName, middleName, lastName } = this.info;
  const firstUpper = (string) =>
    string && string.length
      ? string.charAt(0).toUpperCase() + string.slice(1)
      : "";
  return `
      ${firstUpper(firstName)} 
      ${firstUpper(middleName)} 
      ${firstUpper(lastName)}`.trim();
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  if (user.isModified("secretKey")) {
    user.secretKey = await bcrypt.hash(user.secretKey, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model("User", userSchema);

module.exports = User;

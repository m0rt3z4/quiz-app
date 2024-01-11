const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    info: {
      firstName: String,
      lastName: String,
    },
    contactInfo: {
      email: String,
      phone: String,
      // Add additional contact fields if needed
    },
    answers: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

const testResponseSchema = new mongoose.Schema({
  testInfo: {
    color: {
      type: String,
      enum: ["Dark", "Light"],
      required: true,
    },
    character: {
      type: String,
      enum: ["H", "I"],
      required: true,
    },
  },
  results: {
    surprise: {
      correctAnswer: {
        type: Boolean,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
    },
  },
});

module.exports = mongoose.model("Response", responseSchema);

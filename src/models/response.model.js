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

module.exports = mongoose.model("Response", responseSchema);

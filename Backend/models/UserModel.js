const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Provide a User name"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Provide a Password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

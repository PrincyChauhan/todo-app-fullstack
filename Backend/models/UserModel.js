const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please Provide a User name"],
      // unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Provide a Password"],
    },
    email: {
      type: String,
      required: [true, "Please Provide a Email"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);

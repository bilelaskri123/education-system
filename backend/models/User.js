const mongoose = require("mongoose");
const secret = require("../config/secret");
const jwt = require("jsonwebtoken");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: "firstName is required",
    minlength: 3,
    maxlength: 24,
  },
  email: { type: String, required: "emailo is required", unique: true },
  password: { type: String, required: true, minlength: 4 },
  role: {
    type: String,
    required: true,
    enum: ["admin", "student", "teacher", "parent", "librarian", "accountant"],
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

userSchema.plugin(uniqueValidator);

userSchema.methods.generateTokens = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email, role: this.role },
    secret.secret
  );
  return token;
};

module.exports = mongoose.model("User", userSchema);

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

  section: { type: mongoose.Types.ObjectId, ref: "Section" },
  group: { type: mongoose.Types.ObjectId, ref: "Group" },
  payement: { type: String, enum: ["yes", "no"] },
  emailParent: { type: String },

  childEmail: { type: String, unique: true },

  speciality: { type: String },
  salary: { type: Number },
  adress: { type: String },
  birdhday: { type: String },
  phone: { type: String },
  linkedin: { type: String },
  image: { type: String },
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

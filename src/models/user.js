const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,

      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    phtotUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Url is not valid");
        }
      },
    },
    about: {
      type: String,
      default: `This is the default of about of the user`,
      maxlength: 120,
    },
    skills: {
      type: [String],
      validate(value) {
        if (value.length > 10) {
          throw new Error("Skills can't be more than 10");
        }
      },
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "uday@tyagi#1410$$");
  return token;
};

userSchema.methods.verifyPassword = async function (password) {
  const user = this;
  const isValid = await bcrypt.compare(password, user.password);
  return isValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;

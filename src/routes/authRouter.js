const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/user");
const { signUpValidation } = require("../utils/validation");

const authRouter = express.Router();

// signUP API
authRouter.post("/signUp", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;
  try {
    //validate the data first
    signUpValidation(req);
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // creating the new instance of the User Model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("user is saved successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// Login API
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const isValidEmail = validator.isEmail(emailId);
    if (!isValidEmail) {
      throw new Error("Please Enter a Valid Email");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordMatch = await user.verifyPassword(password);
    if (isPasswordMatch) {
      const token = await user.getJWT();
      res.cookie("token", token);
      res.send("Login Succesfull");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = authRouter;

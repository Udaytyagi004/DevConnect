const { userAuth } = require("../middlewares/Auth");
const User = require("../models/user");

const express = require("express");

const profileRouter = express.Router();

// Profile API
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(404).send("ERROR : " + err.message);
  }
});

//update API
profileRouter.patch("/user/:userId", userAuth, async (req, res) => {
  const data = req.body;
  const userId = req.params?.userId;

  try {
    const allowedFields = [
      "password",
      "age",
      "gender",
      "photoUrl",
      "about",
      "skills",
    ];
    const isAllowed = Object.keys(data).every((k) => allowedFields.includes(k));
    if (!isAllowed) {
      throw new Error("Some Fields Can't be updatd");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      new: true,
      strict: false,
      runValidators: true,
    });
    res.send("User Saved Succesfully");
  } catch (err) {
    res.status(400).send("Can't Update the Profile" + err.message);
  }
});

// Feed API => get the data of all the users
profileRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const userData = await User.find({});
    if (userData.length === 0) {
      res.status(404).send("User Not Found");
    }
    res.send(userData);
  } catch (err) {
    res.status(400).send("Something went Wrong");
  }
});

module.exports = profileRouter;

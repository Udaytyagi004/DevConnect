const express = require("express");
const validator = require("validator");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { Collection } = require("mongoose");

// using MiddleWare (provided by express) for reading the json data of requests ==> this wil work for every request on this server
app.use(express.json());
app.post("/signUp", async (req, res) => {
  // creating the new instance of the User Model
  const user = new User(req.body);
  try {
    const isEmailValid = validator.isEmail(user.emailId);
    if (!isEmailValid) throw new Error("Email is not Valid");
    await user.save();
    res.send("user is saved successfully");
  } catch (err) {
    res.status(400).send("Can't SignUp an Error Occured " + err.message);
  }
});

// getting a user with the emailID

app.get("/user", async (req, res) => {
  try {
    const email = req.body.emailId;
    const userData = await User.findOne({ emailId: email });
    if (userData.length === 0) {
      res.status(404).send("User Not Found");
    }
    console.log(typeof userData);
    res.send(userData);
  } catch (err) {
    res.status(400).send("Something went Wrong");
  }
});

// get the user with an Id
app.get("/getbyID", async (req, res) => {
  const id = "690f407274a682aff36ed637";
  try {
    const user = await User.findById(id);
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
// Feed API => get the data of all the users
app.get("/feed", async (req, res) => {
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

// delete API
app.delete("/user", async (req, res) => {
  const id = req.body.Id;

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send("user is not found");
    }
    const username = user.firstName;

    await User.findByIdAndDelete(id);
    res.send(`delete the data of ${username} successfully`);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//update API
app.patch("/user/:userId", async (req, res) => {
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

connectDB()
  .then(() => {
    console.log("Database is connected succesfully");
    app.listen(3000, () => {
      console.log("Server is Succesfully listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("Can't connect to the database");
  });

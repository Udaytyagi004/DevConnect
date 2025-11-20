const express = require("express");
const bcrypt = require("bcrypt");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { Collection } = require("mongoose");
const { signUpValidation } = require("./utils/validation");
const validator = require("validator");

// using MiddleWare (provided by express) for reading the json data of requests ==> this wil work for every request on this server
app.use(express.json());
app.post("/signUp", async (req, res) => {
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

// Login API

app.post("/login", async (req, res) => {
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
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      res.send("Login Succesfull");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
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

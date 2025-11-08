const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signUp", async (req, res) => {
  const userData = {
    firstName: "Virat",
    lastName: "Kohli",
    emailId: "virat123@gmail.com",
    password: "virat@000",
    age: 35,
    gender: "Male",
  };
  // creating the new instance of the User Model
  const user = new User(userData);
  await user.save();

  res.send("user is saved successfully");
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

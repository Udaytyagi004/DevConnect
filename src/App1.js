const express = require("express");
const { adminAuth } = require("./middlewares/Auth");
const { userAuth } = require("./middlewares/Auth");

const app = express();

app.use("/admin", adminAuth);
app.get("/admin/getData", (req, res) => {
  res.send("All Data is sent");
});

app.use("/user", userAuth);

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted succesfully");
});

app.get("/user", (req, res) => {
  res.send("Hello User from the Server");
});

app.get("/user/profile", (req, res) => {
  res.send("this is the profile of the user");
});
app.post("/user/update", (req, res) => {
  res.send("Profile is updated successfully");
});
app.delete("/user/deleteProfile", (req, res) => {
  res.send("The data is deleted succesfully");
});
app.listen(7777, () => {
  console.log("server is started successfully");
});

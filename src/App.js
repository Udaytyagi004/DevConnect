const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({ firstname: "Uday", lastname: "Tyagi" });
});

app.post("/user", (req, res) => {
  //logic to save the data in the DB
  res.send("Data is saved succesfully");
});

app.delete("/user", (req, res) => {
  // logic to delete the data from the DB
  res.send("Data is deleted successfully");
});

app.put("/user", (req, res) => {
  res.send("Testing the PUT method API call");
});

app.patch("/user", (req, res) => {
  res.send("Testing the PATCH method API call");
});

app.use("/test", (req, res) => {
  res.send("testing the server");
});
app.use("/home", (req, res) => {
  res.send(" hello from the server");
});
// app.use("/", (req, res) => {
//   res.send("home of the server");
// });
app.listen(3000, () => {
  console.log("Server is Succesfully listening on port 3000");
});

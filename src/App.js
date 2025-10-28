const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("testing the server");
});
app.use("/home", (req, res) => {
  res.send(" hello from the server");
});

app.listen(3000, () => {
  console.log("Server is Succesfully listening on port 3000");
});

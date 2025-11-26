const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();
// using MiddleWare (provided by express) for reading the json data of requests ==> this wil work for every request on this server
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
app.use("/", authRouter);
app.use("/", profileRouter);

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

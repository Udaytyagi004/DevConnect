const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://udaytyagi:udaytyagi@devconnect.h1rppk0.mongodb.net/DevConnect"
  );
};

module.exports = connectDB;

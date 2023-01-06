const mongoose = require("mongoose");
require("dotenv").config();

const REACT_APP_DB_URI = process.env.REACT_APP_DB_URI;

module.exports = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(REACT_APP_DB_URI, {
      useNewUrlParser: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error on DB connect: ", error.message);

    process.exit(1);
  }
};
const mongoose = require("mongoose");
require("dotenv").config();

console.log("config db connection requested");

const URI = process.env.DB_URI;

module.exports = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected - linkModel");
  } catch (error) {
    console.log("Error on DB connect: ", error.message);

    process.exit(1);
  }
};

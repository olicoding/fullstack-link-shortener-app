const mongoose = require("mongoose");

console.log("Link Model connection requested");

const { Schema } = mongoose;

const linkSchema = new Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Link", linkSchema);

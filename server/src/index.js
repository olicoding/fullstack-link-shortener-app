require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3000;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected - srv: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Use helmet to set security headers
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
    },
  })
);
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(helmet.hsts());

// Set up rate limiting for all routes
const rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 20, // 20 requests
  message: "Too many requests from this IP, please try again later",
});
app.use(rateLimiter);

app.use(cors());
app.use(express.json());

app.use("/", (req, res, next) => {
  console.log("Server connection requested");
  next();
});

app.use("/api", require("../api/links/routes/linkRoutes"));

app.use(express.static("app"));

if (process.env.NODE_ENV === "production") {
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "app", "index.html"));
  });
}

// Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
  });
});

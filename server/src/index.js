require("../api/links/config/db")();
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

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

console.log("path.join -> ", path.join(__dirname + "/public"));
app.use(express.static(path.join(__dirname + "/public")));

app.use("/", (req, res, next) => {
  console.log("Server connection requested");
  next();
});

app.use("/api", require("../api/links/routes/linkRoutes"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});

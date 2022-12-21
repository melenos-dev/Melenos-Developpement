const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const knex = require("./db/db");

//const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json()); // Recover the post request in json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: process.env.AUDIENCE }));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "sessionss",
    cookie: {
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 Year
      sameSite: "none",
      httpOnly: true,
      secure: true,
    },
  })
);

app.use((req, res, next) => {
  helmet({
    crossOriginEmbedderPolicy: false,
  });

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // req.headers.origin
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const quoteRoutes = require("./routes/quote");
const refreshRoutes = require("./routes/refresh");
const multerRoutes = require("./routes/multer");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/", express.static(path.join(__dirname, "./public")));
app.use("/api/posts", postRoutes);
app.use("/api/quote", quoteRoutes);
app.use("/api", refreshRoutes);
app.use("/api", multerRoutes);

/*
User.findOne({ email: process.env.ADMIN_DEFAULT_EMAIL }).then((user) => {
  if (!user) {
    // If the first admin is not already created
    bcrypt
      .hash(process.env.ADMIN_DEFAULT_PASSWORD, 10) // Encrypt the password
      .then((hash) => {
        const user = new User({
          firstName: "Yann",
          lastName: "Ducret",
          email: process.env.ADMIN_DEFAULT_EMAIL,
          password: hash,
          roles: 50, // Admin User
        });
        user.save();
      });
  }
});
*/

module.exports = app;

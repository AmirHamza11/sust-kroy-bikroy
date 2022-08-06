"use strict";

const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const authController = require("./controllers/authController");

const app = express();

dotenv.config({ path: __dirname + "./.env" });

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// -----page routes-----

app.get("/", authController.isLoggedIn, (req, res) => {
  res.status(200).render("index", {
    user: req.user,
  });
});

app.get("/login", (req, res) => {
  res.status(200).render("login", {
    message: null,
  });
});

app.get("/register", (req, res) => {
  res.status(200).render("register", {
    message: null,
  });
});

app.get("/profile", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.status(200).render("profile", {
      user: req.user,
    });
  } else {
    res.status(302).redirect("/login");
  }
});

app.get("/product", (req, res) => {
  res.status(200).render("product");
});

app.use("/auth", require("./routes/authRoute"));

app.use((req, res, next) => {
  res.status(404).render("error", {
    title: "404 - Page Not Found",
    message: "Oops!!! The page you requested doesn't exist.",
  });
});

app.listen(3000, () => {
  console.log(`App is listening at port ${3000}`);
});

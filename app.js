"use strict";

const express = require("express");
const pool = require("./db");
const dotenv = require("dotenv");
const path = require("path");

const app = express();

dotenv.config({ path: "./.env" });

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "ghumabo11",
//   database: "test",
// });

// connection.connect(() => {
//   console.log("connected");
// });

pool.query("Select 1+1 as solution", (err, rows, fields) => {
  if (err) throw err;
  console.log(fields);
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
  res.status(200).json({
    title: "homepage",
  });
});

app.use("/auth", require("./routes/auth"));

app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});

// connection.end();

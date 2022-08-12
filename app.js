const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
// routers
const indexRouter = require("./routes/indexRoute");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const messRouter = require("./routes/messRoute");
const orderRouter = require("./routes/orderRoute");
const authRouter = require("./routes/authRoute");

const app = express();

dotenv.config({ path: __dirname + "./.env" });
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/mess", messRouter);
app.use("/order", orderRouter);
app.use("/auth", authRouter);
app.use("/", indexRouter);

app.use((req, res, next) => {
  res.status(404).render("error", {
    title: "404 - Page Not Found",
    message: "Oops!!! The page you requested doesn't exist.",
  });
});

app.listen(3000, () => {
  console.log(`App is listening at port ${3000}`);
});

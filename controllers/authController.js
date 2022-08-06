const pool = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

exports.register = (req, res) => {
  console.log(req.body);

  const { full_name, email, password, confirmedPassword } = req.body;

  if (!full_name) {
    return res.status(400).render("register", {
      message: "Please provide your full name",
    });
  } else if (!email) {
    return res.status(400).render("register", {
      message: "Please provide your email",
    });
  } else if (!password) {
    return res.status(400).render("register", {
      message: "Please provide a password",
    });
  } else if (password !== confirmedPassword) {
    return res.status(400).render("register", {
      message: "Passwords do not match",
    });
  }

  pool.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).render("error", {
          title: "500 - Internal Server Error",
          message: "We're sorry. Something went wrong on our side.",
        });
      }

      if (results.length > 0) {
        return res.status(400).render("register", {
          message: "email already in use",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      pool.query(
        "INSERT INTO users SET ?",
        { full_name, email, password: hashedPassword },
        (error, results) => {
          if (error) {
            console.log(error);
            return res.status(500).render("error", {
              title: "500 - Internal Server Error",
              message: "We're sorry. Something went wrong on our side.",
            });
          }

          //TODO: directly log in to account

          console.log(results);
          return res.status(200).redirect("/login");
        }
      );
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  // TODO: change to redirect
  if (!email) {
    return res.status(400).render("login", {
      message: "Please provide your email",
    });
  } else if (!password) {
    return res.status(400).render("login", {
      message: "Please provide your password",
    });
  }

  pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).render("error", {
          title: "500 - Internal Server Error",
          message: "We're sorry. Something went wrong on our side.",
        });
      }

      if (!results || !(await bcrypt.compare(password, results[0].password))) {
        return res.status(400).render("login", {
          message: "email or password is incorrect",
        });
      }

      const user_id = results[0].user_id;
      const jwtToken = jwt.sign({ user_id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };

      res.cookie("jwtToken", jwtToken, cookieOptions);
      res.status(200).redirect("/");
    }
  );
};

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwtToken) {
    try {
      const decodedData = await promisify(jwt.verify)(
        req.cookies.jwtToken,
        "qwe123"
      );

      pool.query(
        "SELECT * FROM users WHERE user_id = ?",
        [decodedData.user_id],
        (error, results) => {
          if (error) {
            console.log(error);
            return res.status(500).render("error", {
              title: "500 - Internal Server Error",
              message: "We're sorry. Something went wrong on our side.",
            });
          }

          req.user = results[0];
          return next();
        }
      );
    } catch (err) {
      console.log(error);
      return res.status(500).render("error", {
        title: "500 - Internal Server Error",
        message: "We're sorry. Something went wrong on our side.",
      });
    }
  } else {
    next();
  }
};

exports.logout = (req, res) => {
  res.clearCookie("jwtToken", { httpOnly: true });
  res.status(200).redirect("/");
};

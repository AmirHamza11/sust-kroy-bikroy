const pool = require("../db");

exports.indexPage = (req, res) => {
  pool.query(
    "SELECT * FROM products ORDER BY created_at desc LIMIT 8",
    async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).render("error", {
          title: "500 - Internal Server Error",
          message: "Something went wrong on our side.",
        });
      }

      const recentProducts = results;

      pool.query(
        "SELECT * FROM mess ORDER BY created_at desc LIMIT 8",
        async (error, results) => {
          if (error) {
            console.log(error);
            return res.status(500).render("error", {
              title: "500 - Internal Server Error",
              message: "Something went wrong on our side.",
            });
          }

          res.status(200).render("index", {
            recentProducts,
            recentMess: results,
            user: req.user,
          });

          // res.status(200).json({
          //   status: 200,
          //   recentPosts,
          //   recentMess: results,
          // });
        }
      );
    }
  );

  // res.status(200).render("index", {
  //   user: req.user,
  // });
};

exports.userLogin = (req, res) => {
  res.status(200).render("login", {
    message: null,
  });
};

exports.userRegister = (req, res) => {
  res.status(200).render("register", {
    message: null,
  });
};

exports.userProfile = (req, res) => {
  if (req.user) {
    res.status(200).render("profile", {
      user: req.user,
    });
  } else {
    res.status(302).redirect("/login");
  }
};

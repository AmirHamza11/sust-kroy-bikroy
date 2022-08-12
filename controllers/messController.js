const pool = require("../db");

exports.postMessPage = (req, res) => {
  res.status(200).json({
    data: "mess post page",
  });
};

exports.updateMessPage = (req, res) => {
  res.status(200).json({
    data: "update mess page",
  });
};

exports.postMess = (req, res) => {
  const data = {
    location: req.body.location,
    contact_info: req.body.contact_info,
    vacancy: req.body.vacancy,
    details: req.body.details,
    total_fee: req.body.total_fee,
    image1_path: req.body.image1_path,
    image2_path: req.body.image2_path,
    searcher_id: req.body.searcher_id,
  };

  console.log(data);

  pool.query("INSERT INTO mess SET ?", data, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).render("error", {
        title: "500 - Internal Server Error",
        message: "The mess wasn't created. Something went wrong.",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        result,
      },
    });
  });
};

exports.getMess = (req, res) => {
  const SQL =
    "SELECT * FROM mess INNER JOIN users ON searcher_id = user_id WHERE mess_id = ?";
  const id = req.params.id;
  pool.query(SQL, id, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).render("error", {
        title: "500 - Internal Server Error",
        message:
          "The mess post wasn't found. Something went wrong on our side.",
      });
    }

    const data = {
      location: result[0].location,
      contact_info: result[0].contact_info,
      vacancy: result[0].vacancy,
      details: result[0].details,
      total_fee: result[0].total_fee,
      image1_path: result[0].image1_path,
      image2_path: result[0].image2_path,
      searcher_id: result[0].searcher_id,
      full_name: result[0].full_name,
    };

    console.log(data);

    res.status(200).json({
      status: "success",
      data,
    });
  });
};

exports.updateMess = (req, res) => {
  const product_id = req.params.id;

  const data = {
    location: req.body.location,
    contact_info: req.body.contact_info,
    vacancy: req.body.vacancy,
    details: req.body.details,
    total_fee: req.body.total_fee,
    image1_path: req.body.image1_path,
    image2_path: req.body.image2_path,
    searcher_id: req.body.searcher_id,
  };

  console.log(data);

  pool.query(
    "UPDATE mess SET ? WHERE mess_id = ?",
    [data, product_id],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).render("error", {
          title: "500 - Internal Server Error",
          message:
            "The Post wasn't created.. Something went wrong on our side.",
        });
      }

      res.status(200).json({
        status: "success",
        data: {
          result,
        },
      });
    }
  );
};

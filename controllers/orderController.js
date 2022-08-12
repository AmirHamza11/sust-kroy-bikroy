const pool = require("../db");

exports.createOrder = (req, res) => {
  const data = ({
    seller_id,
    buyer_id,
    product_id,
    quantity,
    order_status,
    completed_at,
    total_price,
  } = req.body);

  console.log(data);

  pool.query("INSERT INTO orders SET ?", data, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).render("error", {
        title: "500 - Internal Server Error",
        message: "The order wasn't created. Something went wrong on our side.",
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

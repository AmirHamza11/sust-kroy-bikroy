const pool = require("../db");

exports.postProductPage = (req, res) => {
  res.status(200).json({
    data: "post product page",
  });
};

exports.updateProductPage = (req, res) => {
  res.status(200).json({
    data: "update product page",
  });
};

exports.postProduct = (req, res) => {
  const data = {
    product_name: req.body.product_name,
    price: req.body.price,
    contact_info: req.body.contact_info,
    receiving_address: req.body.receiving_address,
    details: req.body.details,
    image1_path: req.body.image1_path,
    image2_path: req.body.image2_path,
    quantity: req.body.quantity,
    seller_id: req.body.seller_id,
    category_id: req.body.category_id,
    bought_at: req.body.bought_at,
  };

  console.log(data);

  pool.query("INSERT INTO products SET ?", data, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).render("error", {
        title: "500 - Internal Server Error",
        message: "The Post wasn't created.. Something went wrong on our side.",
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

exports.getFilteredProducts = (req, res) => {
  var SQL = "SELECT * FROM products";

  const filteringValues = [];

  const category_id = req.query.category_id;
  if (category_id !== undefined) {
    SQL += " WHERE category_id = ?";
    filteringValues.push(category_id);
  }

  const query_sort_by = req.query.sort_by;
  if (req.query.sort_by !== undefined) {
    SQL += " ORDER BY ? ?";
    if (query_sort_by === "most_recent") {
      filteringValues.push("created_at", "desc");
    } else if (query_sort_by === "lowest_price") {
      filteringValues.push("price", "asc");
    }
  }

  pool.query(SQL, filteringValues, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).render("error", {
        title: "500 - Internal Server Error",
        message: "The Post wasn't created.. Something went wrong on our side.",
      });
    }

    console.log(results);

    console.log(SQL);
    res.status(200).json({
      status: "success",
      results,
    });
  });
};

exports.getProduct = (req, res) => {
  const SQL =
    "SELECT * FROM products INNER JOIN users ON seller_id = user_id WHERE product_id = ?";
  const id = req.params.id;
  pool.query(SQL, id, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).render("error", {
        title: "500 - Internal Server Error",
        message: "Something went wrong on our side.",
      });
    }

    const data = {
      product_id: result[0].product_id,
      product_name: result[0].product_name,
      price: result[0].price,
      contact_info: result[0].contact_info,
      receiving_address: result[0].receiving_address,
      details: result[0].details,
      image1_path: result[0].image1_path,
      image2_path: result[0].image2_path,
      quantity: result[0].quantity,
      seller_id: result[0].seller_id,
      category_id: result[0].category_id,
      bought_at: result[0].bought_at,
      full_name: result[0].full_name,
    };

    // console.log(data);

    pool.query(
      "SELECT * FROM products WHERE (category_id = ? AND product_id != ?) LIMIT 4",
      [data.category_id, data.product_id],
      (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).render("error", {
            title: "500 - Internal Server Error",
            message: "Something went wrong on our side.",
          });
        }
        // console.log(results);
        res.status(200).render("product", {
          data,
          suggestedProducts: results,
        });
      }
    );
  });
};

exports.updateProduct = (req, res) => {
  const product_id = req.params.id;

  const data = {
    product_name: req.body.product_name,
    price: req.body.price,
    contact_info: req.body.contact_info,
    receiving_address: req.body.receiving_address,
    details: req.body.details,
    image1_path: req.body.image1_path,
    image2_path: req.body.image2_path,
    quantity: req.body.quantity,
    seller_id: req.body.seller_id,
    category_id: req.body.category_id,
    bought_at: req.body.bought_at,
  };

  console.log(data);

  pool.query(
    "UPDATE products SET ? WHERE product_id = ?",
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

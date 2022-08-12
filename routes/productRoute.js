const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.post("/", productController.postProduct);

router.get("/post", productController.postProductPage);

router.get("/", productController.getFilteredProducts);

router.get("/:id", productController.getProduct);

router.get("/:id/update", productController.updateProductPage);

router.patch("/:id", productController.updateProduct);

module.exports = router;

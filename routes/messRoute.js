const express = require("express");
const messController = require("../controllers/messController");
const router = express.Router();

router.post("/", messController.postMess);

router.get("/post", messController.postMessPage);

router.get("/:id", messController.getMess);

router.get("/:id/update", messController.updateMessPage);

router.patch("/:id", messController.updateMess);

module.exports = router;

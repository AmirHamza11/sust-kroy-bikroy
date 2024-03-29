const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.patch("/:id", userController.updateUser);

router.get("/:id", userController.getUser);

module.exports = router;

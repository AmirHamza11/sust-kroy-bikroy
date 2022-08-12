const express = require("express");
const indexController = require("../controllers/indexController");
const authController = require("../controllers/authController");
const router = express.Router();

router.get("/", authController.isLoggedIn, indexController.indexPage);

router.get("/login", indexController.userLogin);

router.get("/register", indexController.userRegister);

router.get("/profile", authController.isLoggedIn, indexController.userProfile);

module.exports = router;

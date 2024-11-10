const express = require("express");

const {
  registerController,
  loginController,
} = require("../controllers/UserController");
3;

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;

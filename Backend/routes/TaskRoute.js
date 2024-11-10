const express = require("express");

const { createTask } = require("../controllers/TaskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createTask);

module.exports = router;

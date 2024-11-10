const express = require("express");

const { createTask, getTasks } = require("../controllers/TaskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);

module.exports = router;

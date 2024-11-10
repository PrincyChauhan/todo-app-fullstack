const express = require("express");

const {
  createTask,
  getTasks,
  updateTask,
} = require("../controllers/TaskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.put("/", authMiddleware, updateTask);

module.exports = router;

const express = require("express");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/TaskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createTask);
router.post("/", authMiddleware, getTasks);
router.put("/", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;

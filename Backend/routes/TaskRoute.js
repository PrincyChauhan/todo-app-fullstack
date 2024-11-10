const express = require("express");
const { createTask } = require("../controllers/TaskController");
const router = express.Router();
router.post("/create", createTask);
module.exports = router;

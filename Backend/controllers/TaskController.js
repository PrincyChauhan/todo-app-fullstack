const Task = require("../models/TaskModel");

const createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, createdBy: req?.user_id });
    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Task API",
      error,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req?.user_id });
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get Tasks API",
      error,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
};

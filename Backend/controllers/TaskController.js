const Task = require("../models/TaskModel");

const createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body });
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

module.exports = {
  createTask,
};

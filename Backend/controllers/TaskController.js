const { default: mongoose } = require("mongoose");
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

const updateTask = async (req, res) => {
  try {
    console.log(req.body);
    const task = await Task.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(req.body.id),
        createdBy: new mongoose.Types.ObjectId(req?.user_id),
      },
      req.body,
      { new: true }
    );

    if (!task) {
      res.status(500).send({
        success: false,
        message: "Task Not found",
      });
    }
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Task API",
      error,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
};

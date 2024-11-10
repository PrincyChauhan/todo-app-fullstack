const { default: mongoose } = require("mongoose");
const Task = require("../models/TaskModel");

const createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, createdBy: req?.user_id });
    return res.status(201).json(task);
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
    if (!tasks?.length) {
      res.status(500).send({
        success: false,
        message: "Task Not found",
      });
    }
    return res.status(200).send({
      success: true,
      tasks,
    });
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
      return res.status(500).send({
        success: false,
        message: "Task Not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Task Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Task API",
      error,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: new mongoose.Types.ObjectId(req.params.id),
      createdBy: new mongoose.Types.ObjectId(req?.user_id),
    });
    if (!task) {
      return res.status(500).send({
        success: false,
        message: "Task Not found",
      });
    }
    await Task.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(req.params.id),
      createdBy: new mongoose.Types.ObjectId(req?.user_id),
    });
    return res.status(200).send({
      success: true,
      message: "Task Deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Delete Task API",
      error,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};

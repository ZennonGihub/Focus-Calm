import boom from "@hapi/boom";
import Task from "../models/tasks.model.js";

export const findTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!user) {
      throw boom.notFound(`task not found`);
    }
    res.status(201).json({ task });
  } catch (error) {
    next(error);
  }
};

export const find = async (req, res, next) => {
  try {
    const tasks = await Task.find().lean();
    if (users.length === 0) {
      console.log("No tasks");
    }
    res.status(201).json({ tasks });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    next(error);
  }
};

export const changeTask = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const newTask = await Task.findByIdAndUpdate(id, body, { new: true });
    if (!newTask) {
      console.log("tasks not found");
    }
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};
export const remove = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  try {
    const task = await Task.findById(id);
    console.log(user);
    const taskRemoved = await Task.deleteOne(task._id);
    res.status(200).json(taskRemoved);
  } catch (error) {
    next(error);
  }
};

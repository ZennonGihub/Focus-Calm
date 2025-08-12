import TasksServices from "../services/tasks.service.js";

const service = new TasksServices();

export const findTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await service.findOne(id);
    res.status(201).json({ task });
  } catch (error) {
    next(error);
  }
};

export const find = async (req, res, next) => {
  try {
    const tasks = await service.find();
    res.status(201).json({ tasks });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const task = {
      ...req.body,
      userId: req.user.id,
    };
    console.log("Req.User:", req.user);
    console.log("Task to create:", task);
    const savedTask = await service.create(task);
    res.status(201).json(savedTask);
  } catch (error) {
    next(error);
  }
};

export const changeTask = async (req, res, next) => {
  try {
    const newTask = await service.update(req.params.id, req.body);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};
export const remove = async (req, res, next) => {
  try {
    const removeTask = await service.remove(req.params.id, req.body);
    res.status(200).json(removeTask);
  } catch (error) {
    next(error);
  }
};

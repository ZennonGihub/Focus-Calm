import boom from "@hapi/boom";
import Task from "./../models/tasks.model.js";

class TasksServices {
  constructor() {}
  async create(body) {
    if (body.title === undefined || body.description === undefined) {
      throw boom.badRequest("missing data");
    }
    const newTask = await Task.create(body);
    const taskObject = newTask.toObject();
    return taskObject;
  }

  async find() {
    const tasks = await Task.find().lean();
    return tasks;
  }

  async findOne(id) {
    const task = await Task.findById(id);
    if (!task) {
      throw boom.notFound("ta sk not found");
    }
    return task;
  }

  async update(id, changes) {
    const task = await this.findOne(id);
    const rta = await Task.findByIdAndUpdate(id, changes, { new: true });
    return rta;
  }

  async delete(id) {
    const task = await this.findOne(id);
    await Task.findByIdAndDelete(id);
    return { id };
  }
}

export default TasksServices;

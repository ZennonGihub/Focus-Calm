import boom from "@hapi/boom";
import Task from "./../models/tasks.model.js";

class TasksServices {
  constructor() {}
  async create(body) {
    if (body === undefined) {
      throw boom.badRequest("missing data");
    }
    const newBody = {
      ...body,
      userId: body.userId || null,
    };
    const newTask = await Task.create(newBody);
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
      throw boom.notFound("task not found");
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

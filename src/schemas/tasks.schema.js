import joi from "joi";

const id = joi
  .string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .required();

const title = joi.string().min(3).max(100);
const description = joi.string().min(0).max(500).allow("");
const completed = joi.boolean();
const status = joi.string().valid("pending", "in-progress", "completed");

export const createTaskSchema = joi
  .object({
    title: title.required(),
    description: description,
    completed: completed,
    status: status,
  })
  .options({ allowUnknown: false });

export const getTaskIdSchema = joi.object({
  id: id,
});

export const updateTaskSchema = joi
  .object({
    title: title,
    description: description,
    completed: completed,
    status: status,
  })
  .min(1)
  .options({ allowUnknown: false });

export const deleteTaskIdSchema = joi.object({
  id: id,
});

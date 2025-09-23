import mongoose from "mongoose";

const tasksSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Task", tasksSchema);

import mongoose from "mongoose";

const timerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    taskId: {
      type: mongoose.Schema.ObjectId,
      ref: "Task",
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    remainingTime: {
      type: Number,
      default: null,
    },
    startTime: {
      type: Date,
      default: null,
    },
    endTime: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "paused", "finished"],
      default: "paused",
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Timer", timerSchema);

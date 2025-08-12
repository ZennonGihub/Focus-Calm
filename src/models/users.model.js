import e from "express";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["free", "pago"],
    default: "free",
  },
  streakAcount: {
    type: Number,
    default: 0,
  },
  lastcompleted: {
    type: Date,
  },
});

export default mongoose.model("User", userSchema);

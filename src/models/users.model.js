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
  streakAcount: {
    type: Number,
    default: 0,
  },
  lastcompleted: {
    type: Date,
  },
});

export default mongoose.model("User", userSchema);

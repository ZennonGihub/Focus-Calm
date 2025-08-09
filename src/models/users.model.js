import mongoose from "mongoose";

const userSchema = mongoose.Schema({
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
  password_hash: {
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

export default mongoose.Model("User", userSchema);

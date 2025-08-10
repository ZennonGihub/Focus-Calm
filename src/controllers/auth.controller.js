import User from "../models/users.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    const userReturn = await newUser.save();
    res.status(201).json({
      id: userReturn._id,
      username: userReturn.username,
      email: userReturn.email,
      createdAt: userReturn.createdAt,
      updatedAt: userReturn.updatedAt,
    });
  } catch (error) {
    next(error);
  }
};

export const login = (req, res) => {
  //
};

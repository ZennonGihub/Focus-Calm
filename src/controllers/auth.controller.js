import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import boom from "@hapi/boom";
import { createAccesToken } from "./../libs/jwt.token.js";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const userEmail = findeOne({ email });
    if (!userEmail) {
      throw boom.conflict("email already in used");
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userReturn = await newUser.save();
    const token = await createAccesToken({ id: userReturn._id });
    res.cookie("token", token, { httpOnly: true });
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

export const login = passport.authenticate("local", { session: false });
async (req, res, next) => {
  try {
    const user = req.user;
    const token = createAccesToken({ id: user._id });
  } catch (error) {}
};

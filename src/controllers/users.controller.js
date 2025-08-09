import User from "../models/users.model.js";

export const findUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      console.log("User not found");
    }
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

export const find = async (req, res, next) => {
  try {
    const users = await User.find().lean();
    if (users.length === 0) {
      console.log("No users");
    }
    res.status(201).json({ users });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  try {
    const user = await User.findById(id);
    console.log(user);
    const userRemoved = await User.deleteOne(user._id);
    res.status(200).json(userRemoved);
  } catch (error) {
    next(error);
  }
};

import passport from "passport";
import Service from "./../services/auth.service.js";

const user = new Service();

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    res.status(201).json({
      username,
      email,
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

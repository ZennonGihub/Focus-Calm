import Service from "./../services/auth.service.js";

const service = new Service();

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const { user, token } = service.register(req.body);
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = req.user;
    const token = createAccesToken({ id: user._id });
  } catch (error) {}
};

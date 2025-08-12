import Service from "./../services/auth.service.js";

const service = new Service();

export const register = async (req, res, next) => {
  try {
    const body = req.body;
    const { user, token, refreshToken } = await service.register(body);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 15 * 60 * 1000,
    });
    res.status(201).json({ token, refreshToken, user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = req.user;
    const { token, refreshToken } = await service.login(user);
    console.log("Token", token);
    console.log("Refresh Token", refreshToken);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 15 * 60 * 1000,
    });
    res.status(201).json({ token, refreshToken });
  } catch (error) {
    next(error);
  }
};

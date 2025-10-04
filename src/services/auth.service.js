import boom from "@hapi/boom";
import User from "./../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createAccesToken } from "./../libs/jwt.token.js";

class AuthServices {
  constructor() {}
  async register(body) {
    const { email } = body;
    const emailFound = await User.findOne({ email: email });
    if (emailFound !== null) {
      throw boom.conflict("email already in used");
    }
    const passwordHash = await bcrypt.hash(body.password, 10);
    const newUser = {
      ...body,
      password: passwordHash,
    };
    const userReturn = await User.create(newUser);
    const { token, refreshToken } = await createAccesToken({
      id: userReturn._id,
      role: userReturn.role,
    });
    const userObject = userReturn.toObject();
    delete userObject.password;
    return { userObject, token, refreshToken };
  }

  async login(user) {
    const { token, refreshToken } = await createAccesToken({
      id: user._id.toString(),
      role: user.role,
    });
    return { token, refreshToken };
  }

  async refresh(refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH);
      const user = {
        _id: payload.id,
        role: payload.role,
      };
      const newTokens = await createAccesToken(user);
      return {
        token: newTokens.token,
        refreshToken: newTokens.refreshToken,
      };
    } catch (error) {
      throw boom.unauthorized("Token de refresco inválido o expirado.");
    }
  }
}

export default AuthServices;

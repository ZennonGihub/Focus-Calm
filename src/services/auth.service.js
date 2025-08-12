import boom from "@hapi/boom";
import User from "./../models/users.model.js";
import bcrypt from "bcryptjs";
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
    const { token, refreshToken } = createAccesToken({
      id: userReturn._id,
      role: userReturn.role,
    });
    const userObject = userReturn.toObject();
    delete userObject.password;
    return { userObject, token, refreshToken };
  }

  async login(user) {
    const token = createAccesToken({
      id: user._id,
      role: user.role,
    });
    return token;
  }
}

export default AuthServices;

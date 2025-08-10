import boom from "@hapi/boom";
import User from "./../models/users.model.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from "./../libs/jwt.token.js";

class AuthServices {
  constructor() {}
  async register(body) {
    const { email } = body;
    if (!email) {
      throw boom.conflict("email already in used");
    }
    const passwordHash = bcrypt.hash(body.password, 10);
    const newUser = {
      ...body,
      password: passwordHash,
    };
    const userReturn = await newUser.save();
    const token = await createAccesToken({
      id: userReturn._id,
      role: userReturn.role,
    });
    res.cookie("token", token, { httpOnly: true });
    delete userReturn.dataValues.password;
    return userReturn;
  }

  async login(id) {
    const userFound = await User.findById(id);
    if (!userFound) {
      throw boom.notFound("user not found");
    }
    return userFound;
  }
}

export default AuthServices;

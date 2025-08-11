import boom from "@hapi/boom";
import User from "./../models/users.model.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from "./../libs/jwt.token.js";

class AuthServices {
  constructor() {}
  async register(body) {
    const emailFound = await User.findOne({ email: body.email });
    if (emailFound) {
      throw boom.conflict("email already in used");
    }
    const passwordHash = await bcrypt.hash(body.password, 10);
    const newUser = {
      ...body,
      password: passwordHash,
    };
    const userReturn = await User.create(newUser);
    console.log("NewUser", newUser);
    console.log("UserReturn", userReturn);
    const token = createAccesToken({
      id: userReturn._id,
      role: userReturn.role,
    });
    const userObject = userReturn.toObject();
    delete userObject.password;
    console.log(userObject);
    return { user: userObject, token };
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

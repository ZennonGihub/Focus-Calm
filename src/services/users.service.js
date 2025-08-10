import boom from "@hapi/boom";
import User from "./../models/users.model.js";

class UserServices {
  constructor() {}
  async find() {
    return User.find();
  }

  async findOne(id) {
    const userFound = await User.findById(id);
    if (!userFound) {
      throw boom.notFound("user not found");
    }
    return userFound;
  }
  async change(id, body) {
    const userFound = await this.getOne(id);
    if (!userFound) {
      throw boom.notFound("not users");
    }
    userFound.set(body);
    const rta = await userFound.save();
    return rta;
  }
  async remove(id) {
    const userFound = await this.getOne(id);
    if (!userFound) {
      throw boom.notFound("user not found");
    }
    const rta = await userFound.remove();
    return rta;
  }
}

export default UserServices;

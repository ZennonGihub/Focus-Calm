import boom from "@hapi/boom";
import User from "./../models/users.model.js";
import config from "./../config.js";

class UserServices {
  constructor() {}
  async findUsers() {
    return User.find().lean();
  }

  async findOne(id) {
    const userFound = await User.findById(id);
    if (!userFound) {
      throw boom.notFound("user not found");
    }
    return userFound;
  }
  async change(id, body) {
    const userFound = await this.findOne(id);
    if (!userFound) {
      throw boom.notFound("not users");
    }
    userFound.set(body);
    const rta = await userFound.save();
    return rta;
  }
  async remove(id) {
    console.log(config);
    const userFound = await this.findOne(id);
    if (!userFound) {
      throw boom.notFound("user not found");
    }
    const rta = await User.deleteOne(userFound);
    return rta;
  }
}

export default UserServices;

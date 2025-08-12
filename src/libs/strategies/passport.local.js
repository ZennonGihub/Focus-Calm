import { Strategy } from "passport-local";
import boom from "@hapi/boom";
import bcrypt from "bcryptjs";
import User from "./../../models/users.model.js";

const localStrategy = new Strategy(
  {
    usernameField: "email",
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        done(boom.unauthorized(), false);
      }
      const compare = await bcrypt.compare(password, user.password);
      if (!compare) {
        done(boom.unauthorized(), false);
      }
      const userClean = { ...user.toObject() };
      delete userClean.password;
      done(null, userClean);
    } catch (error) {
      done(error, false);
    }
  }
);

export default localStrategy;

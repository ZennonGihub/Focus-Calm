import { Strategy } from "passport-local";
import boom from "@hapi/boom";
import bcrypt from "bcryptjs";
import User from "./../../models/users.model";

export const localStrategy = new Strategy(
  {
    usernameField: "email",
  },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        done(boom.unauthorized(), false);
      } else {
        const compare = await bcrypt.compare(password, user.password);
        if (!compare) {
          done(boom.unauthorized(), false);
        } else {
          done(null, user);
        }
      }
      delete user.dataValue(user.password);
    } catch (error) {
      done(error, false);
    }
  }
);

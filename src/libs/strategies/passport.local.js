import { Strategy } from "passport-local";
import boom from "@hapi/boom";
import bcrypt from "bcryptjs";
import User from "./../../models/User.js";

const localStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(boom.unauthorized("Usuario o contraseña inválidos"), false);
      }
      const compare = await bcrypt.compare(password, user.password);
      if (!compare) {
        return done(boom.unauthorized("Usuario o contraseña inválidos"), false);
      }
      return done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

export default localStrategy;

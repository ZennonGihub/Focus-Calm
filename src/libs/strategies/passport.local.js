import { Strategy } from "passport-local";
import boom from "@hapi/boom";
import bcrypt from "bcryptjs";
import User from "../../models/users.model.js";

const localStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      console.log("1. Buscando usuario en la base de datos...");
      const user = await User.findOne({ email });
      console.log("2. Búsqueda de usuario finalizada.");

      if (!user) {
        return done(boom.unauthorized("Usuario o contraseña inválidos"), false);
      }

      console.log("3. Iniciando comparación de contraseña (bcrypt)...");
      const compare = await bcrypt.compare(password, user.password);
      console.log("4. Comparación de contraseña finalizada.");

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

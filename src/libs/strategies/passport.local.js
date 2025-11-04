import { Strategy } from "passport-local";
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
        return done(null, false, { message: "Usuario o contraseña inválidos" });
      }

      console.log("3. Iniciando comparación de contraseña (bcrypt)...");
      const compare = await bcrypt.compare(password, user.password);
      console.log("4. Comparación de contraseña finalizada.");

      if (!compare) {
        return done(null, false, { message: "Usuario o contraseña inválidos" });
      }
      return done(null, user);
    } catch (error) {
      console.error("Error en estrategia local:", error);
      return done(error, false);
    }
  }
);

export default localStrategy;

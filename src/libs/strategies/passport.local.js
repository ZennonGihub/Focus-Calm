import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "../../models/users.model.js";

const localStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    console.log("[PASSPORT] Estrategia local iniciada");
    console.log("[PASSPORT] Email recibido:", email);

    try {
      console.log("[PASSPORT] Buscando usuario en DB...");
      const user = await User.findOne({ email });
      console.log(" [PASSPORT] Usuario encontrado:", user ? "SI" : "NO");

      if (!user) {
        console.log("[PASSPORT] Usuario no encontrado, retornando false");
        return done(null, false, { message: "Usuario o contraseña inválidos" });
      }

      console.log(" [PASSPORT] Comparando contraseña...");
      const compare = await bcrypt.compare(password, user.password);
      console.log(" [PASSPORT] Contraseña válida:", compare ? "SI" : "NO");

      if (!compare) {
        console.log("[PASSPORT] Contraseña incorrecta, retornando false");
        return done(null, false, { message: "Usuario o contraseña inválidos" });
      }

      console.log("[PASSPORT] Autenticación exitosa, retornando usuario");
      return done(null, user);
    } catch (error) {
      console.error("[PASSPORT] Error en estrategia:", error);
      return done(error, false);
    }
  }
);

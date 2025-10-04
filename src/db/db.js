import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.URI_DB;
// Temporalmente, dentro de tu archivo de conexión:

console.log(
  "URI_DB cargada (solo mostrar los primeros 20 caracteres):",
  uri ? uri.substring(0, 20) : "URI NO CARGADA"
);

export const connectDb = async () => {
  try {
    await mongoose.connect(uri, {
      dbName: "DbPomodoro",
    });
    console.log(`Connected to the database`);
  } catch (error) {
    console.log(error);
  }
};

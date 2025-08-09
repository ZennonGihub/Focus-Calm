import dotenv from "dotenv";
dotenv.config();
import config from "./config.js";
import { connectDb } from "./db/db.js";
import app from "./app.js";

connectDb();

app.listen(config.port, () => {
  console.log(`Servidor corriendo en el puerto: ${config.port}`);
});

import dotenv from "dotenv";
dotenv.config();
import config from "./config.js";
import { connectDb } from "./db/db.js";
import routerApi from "./router/index.router.js";
import app from "./app.js";

connectDb();
routerApi(app);

app.listen(config.port, () => {
  console.log(`Servidor corriendo en el puerto: ${config.port}`);
});

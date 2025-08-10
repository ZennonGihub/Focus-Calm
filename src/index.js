import dotenv from "dotenv";
dotenv.config();
import config from "./config.js";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import { connectDb } from "./db/db.js";
import app from "./app.js";
connectDb();

const swaggerDocument = YAML.load("./openapi.yaml");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(config.port, () => {
  console.log(`Servidor corriendo en el puerto: ${config.port}`);
});

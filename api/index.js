import dotenv from "dotenv";
dotenv.config();
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import { connectDb } from "../src/db/db.js";
import app from "../src/app.js";

connectDb();

const uri = process.env.URI_DB;
// Temporalmente, dentro de tu archivo de conexión:

console.log(
  "URI_DB cargada (solo mostrar los primeros 20 caracteres):",
  uri ? uri.substring(0, 20) : "URI NO CARGADA"
);

const swaggerDocument = YAML.load("./openapi.yaml");

app.get("/", (req, res) => {
  res.json({ message: "API FOCUS CALM", version: "1.0.0" });
  console.log;
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;

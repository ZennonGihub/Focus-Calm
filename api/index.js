import dotenv from "dotenv";
dotenv.config();

import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import { connectDb } from "../src/db/db.js";
import app from "../src/app.js";
import { checkApiKey } from "./../src/middlewares/auth.middleware.js";

connectDb();

const swaggerDocument = YAML.load("./openapi.yaml");

app.get("/", (req, res) => {
  res.json({ message: "Welcome to your API!", version: "1.0.0" });
});

app.use(checkApiKey);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;

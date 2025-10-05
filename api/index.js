import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import app from "../src/app.js";
import { connectDb } from "./../src/db/db.js";

const swaggerDocument = YAML.load("./openapi.yaml");

app.use(connectDb);
app.get("/", (req, res) => {
  res.json({ message: "API FOCUS CALM", version: "1.0.0" });
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;

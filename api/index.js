import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import app from "../src/app.js";

const swaggerDocument = YAML.load("./openapi.yaml");

app.get("/", (req, res) => {
  res.json({ message: "API FOCUS CALM", version: "1.0.0" });
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;

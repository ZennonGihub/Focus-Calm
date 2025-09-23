import dotenv from "dotenv";
dotenv.config();
import config from "./config.js";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import { connectDb } from "./db/db.js";
import app from "./app.js";
import { checkApiKey } from "./middlewares/auth.middleware.js";
import passport from "./libs/index.passport.js";
connectDb();

const swaggerDocument = YAML.load("./openapi.yaml");

app.get("/", (req, res) => {
  res.send(<h1>Welcome to api</h1>);
});

app.use(checkApiKey);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(config.port, "0.0.0.0", () => {
  console.log(`Servidor corriendo en el puerto: ${config.port}`);
  console.log(process.env.SECRET_KEY);
  console.log(config.refreshToken);
  console.log(config.secretKey);
  console.log(config.uriDb);
});

// src/app.js (Este archivo DEFINE la app)

import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./libs/index.passport.js";
import routerApi from "./router/index.router.js";

import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

const app = express();

const whitelist = [
  "http://127.0.0.1:5500",
  "https://focuscalm.vercel.app",
  "http://localhost:5173",
];

const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Acceso no permitido por CORS"));
    }
  },
  credentials: true,
};

app.use(cors(options));
app.use(passport.initialize());
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

const swaggerDocument = YAML.load("./openapi.yaml");
app.get("/", (req, res) => {
  res.json({ message: "API FOCUS CALM", version: "1.0.0" });
});
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routerApi(app);

export default app;

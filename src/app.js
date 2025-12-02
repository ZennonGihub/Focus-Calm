import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./libs/index.passport.js";
import routerApi from "./router/index.router.js";
import { connectDb } from "./db/db.js";

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
      callback(new Error("no permitido"));
    }
  },
  credentials: true,
};

app.use(cors(options));

app.use(async (req, res, next) => {
  try {
    await connectDb();
    next();
  } catch (error) {
    res.status(500).json({ error: "Error de conexion con la base de datos" });
  }
});

app.use(passport.initialize());
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

routerApi(app);

export default app;

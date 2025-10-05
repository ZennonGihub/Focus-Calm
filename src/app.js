import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import routerApi from "./router/index.router.js";
import { connectDb } from "./db/db.js";

const app = express();

const connectDBMiddleware = async (req, res, next) => {
  try {
    await connectDb();
    next();
  } catch (error) {
    console.error("Error en el middleware de DB:", error);
    res.status(500).json({ message: "Database connection failed." });
  }
};

app.use(connectDBMiddleware);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
routerApi(app);

const whitelist = ["http://127.0.0.1:5500", "https://focuscalm.vercel.app"];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("no permitido"));
    }
  },
};

app.use(cors(options));

export default app;

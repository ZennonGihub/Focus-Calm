import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import routerApi from "./router/index.router.js";

const app = express();
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

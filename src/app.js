import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import routerApi from "./router/index.router.js";
import { connectDb } from "./db/db.js";
const app = express();

const dbConnection = async () => {
  await connectDb();
};

dbConnection();

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

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

routerApi(app);

export default app;

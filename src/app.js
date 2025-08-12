import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import routerApi from "./router/index.router.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
routerApi(app);

export default app;

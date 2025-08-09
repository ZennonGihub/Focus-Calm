import mongoose from "mongoose";
import config from "./../config.js";
import dotenv from "dotenv";
dotenv.config();

console.log(config);
const uri = config.uriDb;

export const connectDb = async () => {
  try {
    await mongoose.connect(uri, {
      dbName: "DbPomodoro",
    });
    console.log(`Connected to the database`);
  } catch (error) {
    console.log(error);
  }
};

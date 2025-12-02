import mongoose from "mongoose";
import boom from "@hapi/boom";
import config from "../config.js";
import { badData } from "@hapi/boom";

const url = config.uriDb;
const uri = process.env.URI_DB;
const dbName = "DbPomodoro";
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDb = async () => {
  if (!uri) {
    throw boom.badData("URI_DB no está definida en las variables de entorno.");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: dbName,
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 20000,
      connectTimeoutMS: 5000,
      maxPoolSize: 1,
      family: 4,
    };

    cached.promise = mongoose
      .connect(uri, opts)
      .then((mongoose) => {
        return mongoose;
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error);
        cached.promise = null;
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

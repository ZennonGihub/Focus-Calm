import mongoose from "mongoose";

const uri = process.env.URI_DB;
console.log("Database URI:", uri);
const dbName = "FocusCalm";
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDb = async () => {
  if (!uri) {
    console.log("Esta es la url", uri);
    throw new Error("URI_DB no está definida en las variables de entorno.");
  }

  if (cached.conn) {
    console.log("Using cached DB connection.");
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
    };

    cached.promise = mongoose
      .connect(uri, opts)
      .then((mongoose) => {
        console.log("DB connection established.");
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

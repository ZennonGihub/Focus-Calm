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
    };

    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
      console.log("DB connection established.");
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

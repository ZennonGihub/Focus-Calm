import { connectDb } from "../db/db.js";

export const dbMiddleware = async (req, res, next) => {
  try {
    await connectDb();
  } catch (error) {
    return res.status(500).json({ message: "Database connection error" });
  }
};

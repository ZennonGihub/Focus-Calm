import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import boom from "@hapi/boom";
dotenv.config();
import config from "./../config.js";

export async function createAccesToken(user) {
  console.log("User Payload (jwtToken):", user);
  const payload = {
    id: user.id,
    role: user.role,
  };
  console.log("User Payload (jwtToken2):", payload);
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {
    expiresIn: "1d",
  });

  return { token: token, refreshToken: refreshToken };
}

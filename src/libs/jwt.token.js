import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import config from "./../config.js";

export function createAccesToken(user) {
  const payload = {
    sub: user._id,
    role: user.role,
  };
  console.log(process.env.secretKey, process.env.refreshToken);
  console.log(config);
  const token = jwt.sign(payload, process.env.secretKey, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(payload, process.env.refreshToken, {
    expiresIn: "1d",
  });

  return { token, refreshToken };
}
function refreshAccesToken() {
  //
}

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function createAccesToken(user) {
  const payload = {
    id: user.id,
    role: user.role,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {
    expiresIn: "1d",
  });

  return { token: token, refreshToken: refreshToken };
}

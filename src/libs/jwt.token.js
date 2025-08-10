import jwt from "jsonwebtoken";
import config from "./../config";

function createAccesToken(user) {
  const payload = {
    id: user._id,
    sub: user.role,
  };
  const token = jwt.sign(payload, config.secretKey, {
    expiresIn: "15m",
  });
}

function refreshAccesToken() {}

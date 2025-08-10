import jwt from "jsonwebtoken";
import config from "./../config.js";

export function createAccesToken(payload) {
  return new Promise((resolve, reject) => {
    const token = jwt.sign(
      payload,
      config.secretKey,
      {
        expiresIn: "15m",
      },
      (err, resolve) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}
function refreshAccesToken() {
  //
}

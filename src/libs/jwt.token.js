import jwt from "jsonwebtoken";
import config from "./../config";

export function createAccesToken(user) {
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

import boom from "@hapi/boom";
import config from "./../config.js";

export function checkApiKey(req, res, next) {
  const apiKey = req.header["apiKey"];
  if (config.apiKey === apiKey) {
    next();
  } else {
    throw boom.unauthorized(`You are not authorized`);
  }
}

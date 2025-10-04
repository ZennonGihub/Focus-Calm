import boom from "@hapi/boom";
import config from "./../config.js";

export function checkApiKey(req, res, next) {
  const apiKey = req.header["api"];
  try {
    if (config.apiKey === apiKey) {
      next();
    }
  } catch (error) {
    throw boom.unauthorized(`You are not authorized`);
  }
}

export function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      throw boom.unauthorized(
        `You do not have permission to perform this action`
      );
    }
  };
}

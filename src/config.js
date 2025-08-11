const config = {
  port: process.env.PORT || 3000,
  uriDb: process.env.URI_DB,
  secretKey: process.env.SECRET_KEY,
  refreshToken: process.env.JWT_REFRESH,
  apiKey: process.env.API_KEY,
};

export default config;

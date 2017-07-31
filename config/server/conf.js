const mongoURL = (process.env.MONGO_USE_LOCAL === 'true')
  ? process.env.MONGO_LOCAL_URL
  : `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.MONGO_WEB_URL}${process.env.MONGO_DB}${process.env.MONGO_AUTH}`;

const serverConfig = {
  mongoURL: mongoURL,
  port: process.env.PORT || 8000,
};

export default serverConfig;

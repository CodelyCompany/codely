const dbConnData = {
  host: process.env.MONGO_HOST || '127.0.0.1',
  port: process.env.MONGO_PORT || 27017,
  database: process.env.MONGO_DATABASE || 'local',
  user: process.env.MONGO_USERNAME || 'user',
  password: process.env.MONGO_PASSWORD || 'secr3t',
};

module.exports = dbConnData;

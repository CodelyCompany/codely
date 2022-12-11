const Redis = require('ioredis');

require('dotenv').config();

const dbConnData = {
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || '127.0.0.1',
  password: process.env.REDIS_PASSWORD || 'pass',
};
const client = new Redis(dbConnData);

module.exports = client;

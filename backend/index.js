const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const client_mongo = require('./config/mongoClient');
const http = require('http');
const users = require('./routes/users');
const exercises = require('./routes/exercises');
const reviews = require('./routes/reviews');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const jwtCheck = require('./auth');
const app = express();
const peerServer = require('./event_handlers/peerServer');
const client_red = require('./config/redisClient');
const sse = require('./event_handlers/sse');
const notifications = require('./routes/notifications');

app.use(express.json());
app.use(cors());

app.use(jwtCheck);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/users', users);
app.use('/exercises', exercises);
app.use('/reviews', reviews);
app.use('/sse', sse);
app.use('/notifications', notifications);
require('dotenv').config();

const port = process.env.PORT || 5000;

client_red.on('connect', () => {
  console.log(`Connected to Redis.`);
  mongoose
    .connect(
      `mongodb://${client_mongo.user}:${client_mongo.password}@${client_mongo.host}:${client_mongo.port}/`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(async (response) => {
      console.log(
        `Connected to MongoDB. Database name: "${response.connections[0].name}"`
      );
      http.createServer(app).listen(port, () => {
        console.log(`API server listening at http://localhost:${port}`);
      });
    });
});

client_red.on('error', (err) => {
  console.error('Error connecting to Redis', err);
});

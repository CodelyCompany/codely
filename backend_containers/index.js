const express = require('express');
const cors = require('cors');
const https = require('https');
const containers = require('./routes/containers');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const jwtCheck = require('./auth');
const fs = require('fs');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      'https://localhost:3000',
      'https://frontend:3000',
      'https://localhost:5000',
      'https://backend:6000',
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

const options = {
  key: fs.readFileSync('./.cert/key.pem'),
  cert: fs.readFileSync('./.cert/cert.crt'),
};

// app.use(jwtCheck);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', containers);

const port = process.env.PORT || 5001;
https.createServer(options, app).listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});

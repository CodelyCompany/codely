const express = require('express');
const cors = require('cors');
const http = require('http');
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
      'http://localhost:3000',
      'http://frontend:3000',
      'http://localhost:5000',
      'http://backend:6000',
      'https://localhost:3000',
      'https://frontend:3000',
      'https://localhost:5000',
      'https://backend:6000',
    ],
    // origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

// const options = {
//   key: fs.readFileSync('./.cert/codely.io.key'),
//   cert: fs.readFileSync('./.cert/codely.io.crt'),
// };

// app.use(jwtCheck);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', containers);

const port = process.env.PORT || 5001;
http.createServer(app).listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});

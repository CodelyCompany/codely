const express = require('express');
const cors = require('cors');
const execSync = require('child_process').execSync;
const http = require('http');
const containers = require('./routes/containers');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const jwtCheck = require('./auth');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST'],
    })
);
// app.use(jwtCheck);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', containers);

const port = process.env.PORT || 5001;
http.createServer(app).listen(port, () => {
    console.log(`API server listening at http://localhost:${port}`);
});

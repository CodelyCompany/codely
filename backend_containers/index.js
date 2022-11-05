const express = require('express');
const cors = require('cors');
const execSync = require('child_process').execSync;
const http = require('http');
const containers = require('./routes/containers');
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
app.use('/', containers);

const port = process.env.PORT || 5001;
http.createServer(app).listen(port, () => {
    console.log(`API server listening at http://localhost:${port}`);
});

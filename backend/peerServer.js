const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const app = express();
const port = 5002;

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT'],
  })
);

const server = app.listen(port, () => {
  console.log(`Websockets are listening on port ${port}`);
});

const io = socket(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  socket.broadcast.emit('hello', 'world');
  console.log(io.sockets.sockets.keys());
});

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

// const joinGame = () => {
//   const rooms = io.of('/').adapter.rooms;
//   const id = Array.from(rooms.get('/waiting'))[0];
//   console.log(io.sockets.adapter.nsp.sockets.get(id));
//   io.sockets.adapter.nsp.sockets.get(id).join('/game');
//   console.log(rooms.get('/game'));
// }

const joinGame = () => {
  const rooms = io.of('/').adapter.rooms;
  const ids = Array.from(rooms.get('/waiting'));
  if (ids.length >= 2) {
    const users = io.sockets.adapter.nsp.sockets;
    users.get(ids[0]).leave('/waiting');
    users.get(ids[1]).leave('/waiting');
    users.get(ids[0]).join('/game');
    users.get(ids[1]).join('/game');
  }
  console.log(rooms.get('/game'));
  console.log(rooms.get('/waiting'));
};

io.on('connection', (socket) => {
  socket.join('/waiting');
  socket.emit('players', Array.from(io.sockets.sockets.keys()).length);
  socket.broadcast.emit(
    'players',
    Array.from(io.sockets.sockets.keys()).length
  );
  socket.on('disconnect', () => {
    socket.emit('players', Array.from(io.sockets.sockets.keys()).length);
    socket.broadcast.emit(
      'players',
      Array.from(io.sockets.sockets.keys()).length
    );
  });
  joinGame();
});

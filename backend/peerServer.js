const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const app = express();
const port = 5002;
const { v4: uuidv4 } = require('uuid');

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

const joinGame = () => {
  const rooms = io.of('/').adapter.rooms;
  const ids = Array.from(rooms.get('/waiting'));
  if (ids.length >= 2) {
    const generatedRoomId = uuidv4();
    const users = io.sockets.adapter.nsp.sockets;
    users.get(ids[0]).leave('/waiting');
    users.get(ids[1]).leave('/waiting');
    users.get(ids[0]).join(`/game-${generatedRoomId}`);
    users.get(ids[1]).join(`/game-${generatedRoomId}`);
    users.get(ids[0]).emit('game', 'found');
    users.get(ids[1]).emit('game', 'found');
  }
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

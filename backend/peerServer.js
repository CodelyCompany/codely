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

let cache = {};

const joinGame = () => {
  const rooms = io.of('/').adapter.rooms;
  const ids = Array.from(rooms.get('/waiting'));
  if (ids.length >= 2) {
    const generatedRoomId = uuidv4();
    const users = io.sockets.adapter.nsp.sockets;
    [0, 1].forEach((num) => {
      users.get(ids[num]).leave('/waiting');
      users.get(ids[num]).join(`/game-${generatedRoomId}`);
      users.get(ids[num]).emit('game', generatedRoomId);
    });
  }
};

const cancelGame = (id) => {
  const room = Array.from(io.of('/').adapter.rooms.get(`/game-${id}`));
  const users = io.sockets.adapter.nsp.sockets;
  [0, 1].forEach((num) => {
    users.get(room[num]).leave(`/game-${id}`);
    users.get(room[num]).join(`/waiting`);
  });
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
  socket.on('game-close', (mess) => {
    io.to(`/game-${mess}`).emit('session-close', 'close');
    cancelGame(mess);
  });
  socket.on('game-accept', (mess) => {
    const prevAcceptation = cache[mess] ?? [];
    cache = { ...cache, [mess]: [...prevAcceptation, 'accepted'] };
    if (cache[mess].length === 2) {
      io.to(`/game-${mess}`).emit('game-accepted', true);
    }
  });
  joinGame();
});

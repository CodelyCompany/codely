const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const app = express();
const port = 5002;
const { v4: uuidv4 } = require('uuid');
const Exercise = require('./models/Exercise');
const _ = require('lodash');
const client = require('./config/redisClient');

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

const getRandomExercise = async () => {
  const exercises = await Exercise.aggregate([
    {
      $project: { _id: 1 },
    },
  ]);
  const pickedEx = exercises[_.random(0, exercises.length - 1)];
  return pickedEx._id;
};

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

io.on('connection', async (socket) => {
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
  socket.on('game-accept', async (mess) => {
    const rooms = await client.lrange(`game-${mess}-acceptation`, 0, -1);
    if (rooms && rooms.length) {
      io.to(`/game-${mess}`).emit(
        'game-accepted',
        JSON.stringify({ roomId: mess, exId: await getRandomExercise() })
      );
    }
    await client.lpush(`game-${mess}-acceptation`, 'accepted');
  });
  socket.on('game-finished', async (mess) => {
    const isFinished = await client.get(`game-${mess}-finished`);
    if (!isFinished) {
      const room = Array.from(io.of('/').adapter.rooms.get(`/game-${mess}`));
      const users = io.sockets.adapter.nsp.sockets;
      const firstUser = users.get(room[0]);
      const secondUser = users.get(room[1]);
      if (socket.id === room[0]) {
        firstUser.emit('game-won');
        secondUser.emit('game-lost');
      }
      if (socket.id === room[1]) {
        secondUser.emit('game-won');
        firstUser.emit('game-lost');
      }
      await client.set(`game-${mess}-finished`, 'true');
      return;
    }
    await io.to(`/game-${mess}`).emit('game-closed');
  });
  joinGame();
});

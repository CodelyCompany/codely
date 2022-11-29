const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const app = express();
const port = 5002;
const { v4: uuidv4 } = require('uuid');
const Exercise = require('../models/Exercise');
const _ = require('lodash');
const client = require('../config/redisClient');

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

const getRandomExercise = async (language) => {
  const exercises = await Exercise.aggregate([
    {
      $addFields: {
        language: {
          $toLower: '$programmingLanguage',
        },
      },
    },
    {
      $match: {
        language: {
          $eq: language,
        },
      },
    },
    {
      $project: { _id: 1 },
    },
  ]);
  const pickedEx = exercises[_.random(0, exercises.length - 1)];
  return pickedEx._id;
};

const hasCommonLanguage = (firstArr, secondArr) => {
  return firstArr.filter((el) => secondArr.includes(el)).length > 0;
};

const hasMatching = (firstUsr, secondUsr, matchings) => {
  return (
    matchings.filter(
      (el) =>
        (el.first === firstUsr && el.second === secondUsr) ||
        (el.second === firstUsr && el.first === secondUsr)
    ).length > 0
  );
};

const joinGame = async () => {
  const rooms = io.of('/').adapter.rooms;
  const ids = Array.from(rooms.get('/waiting'));
  if (ids.length >= 2) {
    const users = io.sockets.adapter.nsp.sockets;
    const connectedUsers = Array.from(users).map((el) => el[0]);
    let pickedLanguages = [];
    let userPointer = 0;
    let commons = [];
    while (pickedLanguages.length !== connectedUsers.length) {
      const languages = await client.get(`user-${connectedUsers[userPointer]}`);
      if (languages) {
        pickedLanguages.push({
          user: connectedUsers[userPointer],
          languages: JSON.parse(languages),
        });
        userPointer++;
      }
    }
    for (const i of pickedLanguages) {
      for (const j of pickedLanguages) {
        if (i.user === j.user) continue;
        if (hasMatching(i.user, j.user, commons)) continue;
        if (hasCommonLanguage(i.languages, j.languages)) {
          commons.push({
            first: i.user,
            second: j.user,
            commons: i.languages.filter((el) => j.languages.includes(el)),
          });
        }
      }
    }
    commons.forEach((pair) => {
      const generatedRoomId = uuidv4();
      const language = _.random(0, pair.commons.length - 1);
      [users.get(pair.first), users.get(pair.second)].forEach((matchedUser) => {
        matchedUser.leave('/waiting');
        matchedUser.join(`/game-${generatedRoomId}`);
        matchedUser.emit(
          'game',
          JSON.stringify({
            game: generatedRoomId,
            language: pair.commons[language],
          })
        );
      });
      const room = io.of('/').adapter.rooms.get('/waiting') ?? [];
      io.to('/waiting').emit('players', Array.from(room).length);
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

const sendResults = (firstUser, secondUser, socketID, room) => {
  if (socketId === room) {
    firstUser.emit('game-won');
    secondUser.emit('game-lost');
    return;
  }
  secondUser.emit('game-won');
  firstUser.emit('game-lost');
};

io.on('connection', async (socket) => {
  socket.join('/waiting');

  const room = io.of('/').adapter.rooms.get('/waiting') ?? [];
  io.to('/waiting').emit('players', Array.from(room).length);

  socket.on('disconnect', () => {
    const room = io.of('/').adapter.rooms.get('/waiting') ?? [];
    io.to('/waiting').emit('players', Array.from(room).length);
  });

  socket.on('game-close', (mess) => {
    io.to(`/game-${mess}`).emit('session-close', 'close');
    cancelGame(mess);
  });

  socket.on('game-preferences', async (mess) => {
    const parsedMess = JSON.parse(mess);
    await client.set(`user-${socket.id}`, JSON.stringify(parsedMess.languages));
  });

  socket.on('game-accept', async (mess) => {
    const acceptation = JSON.parse(mess);
    const rooms = await client.lrange(
      `game-${acceptation.roomId}-acceptation`,
      0,
      -1
    );
    if (rooms && rooms.length) {
      io.to(`/game-${acceptation.roomId}`).emit(
        'game-accepted',
        JSON.stringify({
          roomId: acceptation.roomId,
          exId: await getRandomExercise(acceptation.language),
        })
      );
    }
    await client.lpush(
      `game-${acceptation.roomId}-acceptation`,
      acceptation.userId
    );
  });

  socket.on('game-finished', async (mess) => {
    const isFinished = await client.get(`game-${mess}-finished`);
    if (!isFinished) {
      const room = Array.from(io.of('/').adapter.rooms.get(`/game-${mess}`));
      const users = io.sockets.adapter.nsp.sockets;
      if (Array.from(users).length >= 2) {
        const firstUser = users.get(room[0]);
        const secondUser = users.get(room[1]);
        sendResults(firstUser, secondUser, socket.id, room[0]);
      }
      if (Array.from(users).length === 1) {
        const user = users.get(room[0]);
        user.emit('game-won');
      }
      await client.set(`game-${mess}-finished`, 'true');
      return;
    }
    await io.to(`/game-${mess}`).emit('game-closed');
  });
  joinGame();
});

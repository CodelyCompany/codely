const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Exercise = require('../models/Exercise');
const Review = require('../models/Review');
const Test = require('../models/Test');
const axios = require('axios');
const client = require('../config/redisClient');
require('dotenv').config();
const backendContainersAddress =
  process.env.APP_CONTAINERS_ADDRESS || 'http://localhost:5001';

async function getToken() {
  // try {
  //   const response = await axios.post(
  //     `https://${process.env.APP_DOMAIN}/oauth/token`,
  //     {
  //       client_id: process.env.APP_CONTAINERS_CLIENT_ID,
  //       client_secret: process.env.APP_CONTAINERS_CLIENT_SECRET,
  //       audience: process.env.APP_AUDIENCE,
  //       grant_type: 'client_credentials',
  //     },
  //     {
  //       headers: {
  //         'content-type': 'application/json',
  //         'Accept-Encoding': 'application/json',
  //       },
  //     }
  //   );
  //   return response.data.access_token;
  // } catch (error) {
  //   console.log(error);
  // }
  return 'fake_token';
}

async function runTests(exercise, solution) {
  const token = await getToken();
  let counterCorrect = 0;
  let outputs = [];
  for (const element of exercise.tests) {
    const response = await axios.post(
      `${backendContainersAddress}/${
        exercise.programmingLanguage.toLowerCase() === 'c++'
          ? 'cpp'
          : exercise.programmingLanguage.toLowerCase()
      }`,
      {
        toExecute: solution,
        args: element.input,
        func: exercise.functionName,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    const outputFromResponse = response.data.output.replace(
      /(\r\n|\n|\r)/gm,
      ''
    );
    const outputFromBody = element.output.replace(/(\r\n|\n|\r)/gm, '');
    if (outputFromResponse === outputFromBody) {
      counterCorrect++;
    }
    outputs.push(outputFromResponse);
  }
  return { counterCorrect, outputs };
}

router.get('/', async (req, res) => {
  try {
    const data = await Exercise.find().populate(['author', 'tests']);
    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.get('/checked', async (req, res) => {
  try {
    const data = await Exercise.find({ checked: true, step: 6 }).populate([
      'author',
      'tests',
    ]);
    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.get('/unchecked', async (req, res) => {
  try {
    const data = await Exercise.find({ checked: false, step: 6 }).populate([
      'author',
      'tests',
    ]);
    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Exercise.findById(id).populate(['author', 'tests']);
    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findById(data.author);
    const newExercise = await new Exercise({
      ...data,
      author: user._id,
      tests: [],
    }).save();
    await User.findByIdAndUpdate(user._id, {
      preparedExercises: [...user.preparedExercises, newExercise._id],
    });
    return res.status(201).send(newExercise);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.post('/verify', async (req, res) => {
  try {
    const data = req.body;
    const { counterCorrect, outputs } = await runTests(
      data,
      data.exampleSolution
    );
    return res.status(200).send({
      tests: data.tests.length,
      correct: counterCorrect,
      outputs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.post('/:id/solution', async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const exercise = await Exercise.findById(id).populate('tests');
    const { counterCorrect } = await runTests(exercise, data.solution);
    if (counterCorrect === exercise.tests.length) {
      const user = await User.findById(data.user);
      if (!user.doneExercises.includes(exercise._id)) {
        await User.findByIdAndUpdate(data.user, {
          doneExercises: [...user.doneExercises, exercise._id],
        });
      }
      await Exercise.findByIdAndUpdate(id, {
        doneCounter: exercise.doneCounter + 1,
      });
    }
    return res
      .status(200)
      .send({ tests: exercise.tests.length, correct: counterCorrect });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.put('/', async (req, res) => {
  try {
    const { id, tests, ...rest } = req.body;
    let testsToAdd = {};
    if (tests) {
      testsToAdd = { tests: [] };
      for (let i = 0; i < tests.length; i++) {
        const element = tests[i];
        const newTest = await Test({
          input: element.input,
          output: element.output,
          exercise: id,
        }).save();
        testsToAdd.tests.push(newTest._id);
      }
    }
    await Exercise.findByIdAndUpdate(id, {
      ...rest,
      ...testsToAdd,
    });
    const data = await Exercise.findById(id).populate(['author', 'tests']);
    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.put('/:id/check', async (req, res) => {
  try {
    const id = req.params.id;
    const exercise = await Exercise.findById(id).populate(['author', 'tests']);
    await Exercise.findByIdAndUpdate(id, {
      checked: !exercise.checked,
    });
    return res.status(200).send({
      ...exercise._doc,
      checked: !exercise.checked,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const exercise = await Exercise.findById(id);
    await Exercise.findByIdAndDelete(id);
    const user = await User.findById(exercise.author);
    if (user) {
      await User.findByIdAndUpdate(exercise.author, {
        preparedExercises: user.preparedExercises.filter(
          (n) => n.toString() !== id.toString()
        ),
      });
      await User.findByIdAndUpdate(exercise.author, {
        doneExercises: user.doneExercises.filter(
          (n) => n.toString() !== id.toString()
        ),
      });
    }
    await Review.deleteMany({
      exercise: exercise._id,
    });
    await Test.deleteMany({
      exercise: exercise._id,
    });
    return res.status(200).send({ id });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.put('/checkVersus/:exerciseId/room/:roomId', async (req, res) => {
  try {
    const { roomId, exerciseId } = req.params;
    const data = req.body;
    const exercise = await Exercise.findById(exerciseId).populate('tests');
    const { counterCorrect } = await runTests(exercise, data.solution);
    if (data.won) {
      const solvers = await client.lrange(`game-${roomId}-acceptation`, 0, -1);
      const loserId = solvers[0] === data.user ? solvers[1] : solvers[0];
      const winner = await User.findById(data.user);
      const loser = await User.findById(loserId);

      await User.findByIdAndUpdate(winner._id, {
        wonVersus: winner.wonVersus + 1,
      });
      await User.findByIdAndUpdate(loser._id, {
        lostVersus: loser.lostVersus + 1,
      });
    }
    if (counterCorrect === exercise.tests.length) {
      const user = await User.findById(data.user);
      if (!user.doneExercises.includes(exercise._id)) {
        await User.findByIdAndUpdate(data.user, {
          doneExercises: [...user.doneExercises, exercise._id],
        });
      }
      await Exercise.findByIdAndUpdate(exerciseId, {
        doneCounter: exercise.doneCounter + 1,
      });
    }
    return res
      .status(200)
      .send({ tests: exercise.tests.length, correct: counterCorrect });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

router.delete('/', async (req, res) => {
  try {
    await Exercise.deleteMany({});
    await User.updateMany(
      {},
      {
        preparedExercises: [],
        doneExercises: [],
      }
    );
    await Test.deleteMany({});
    await Review.deleteMany({});
    return res
      .status(200)
      .send({ message: 'Exercises and all relationships have been removed' });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;

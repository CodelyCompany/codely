const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Exercise = require('../models/Exercise');
const Review = require('../models/Review');
const Test = require('../models/Test');
const axios = require('axios');
require('dotenv').config();
const backendContainersAddress =
  process.env.APP_BACKEND_CONTAINERS || 'http://localhost:5001';

async function runTests(exercise, solution) {
  let counterCorrect = 0;
  for (let i = 0; i < exercise.tests.length; i++) {
    const element = exercise.tests[i];
    const response = await axios.post(
      backendContainersAddress +
        '/' +
        exercise.programmingLanguage.toLowerCase(),
      {
        toExecute: solution,
        args: element.input,
        func: exercise.functionName,
      }
    );
    const res1 = response.data.output.replace(/(\r\n|\n|\r)/gm, '');
    const res2 = element.output.replace(/(\r\n|\n|\r)/gm, '');
    if (res1 === res2) {
      counterCorrect++;
    }
  }
  return counterCorrect;
}

router.get('/', async (req, res) => {
  try {
    const data = await Exercise.find({}).populate(['author', 'tests']);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/checked', async (req, res) => {
  try {
    const data = await Exercise.find({ checked: true }).populate([
      'author',
      'tests',
    ]);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/unchecked', async (req, res) => {
  try {
    const data = await Exercise.find({ checked: false }).populate([
      'author',
      'tests',
    ]);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Exercise.findById(id).populate(['author', 'tests']);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findById(id).populate('preparedExercises');
    res.status(200).send(data.preparedExercises);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/withTest/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Exercise.findById(id).populate('tests');
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post('/addExercise', async (req, res) => {
  try {
    const data = req.body;
    const counterCorrect = await runTests(data, data.exampleSolution);
    if (counterCorrect === data.tests.length) {
      const user = await User.findById(data.author);
      const newExercise = new Exercise({
        ...data,
        author: user._id,
        tests: [],
      });
      await newExercise.save();
      let tests = [];
      for (let i = 0; i < data.tests.length; i++) {
        const element = data.tests[i];
        const newTest = new Test({
          input: element.input,
          output: element.output,
          exercise: newExercise._id,
        });
        await newTest.save();
        tests.push(newTest._id);
      }
      await Exercise.findByIdAndUpdate(newExercise._id, {
        tests,
      });
      await User.findByIdAndUpdate(user._id, {
        preparedExercises: [...user.preparedExercises, newExercise._id],
      });
      return res.status(200).send(newExercise);
    }
    return res.status(400).send('Wrong example solution');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post('/checkBeforeAddExercise', async (req, res) => {
  const data = req.body;
  const counterCorrect = await runTests(data, data.exampleSolution);
  return res
    .status(200)
    .send({ tests: data.tests.length, correct: counterCorrect });
});

router.post('/checkSolution/:id', async (req, res) => {
  try {
    // const token = await axios.post(
    //     'https://dev-v6t-co5x.us.auth0.com/oauth/token',
    //     {
    //         headers: { 'content-type': 'application/json' },
    //         body: '{"client_id":"7iSINn2Fvm0tkLKH8XwwyiqYYEzJFYSM","client_secret":"D61mgH5J4q7CqwvcO6iJtggeL65qQZnWrdhRS2SXwoJTtgHSMJbGhdUWiAGWmVFJ","audience":"http://localhost:5001","grant_type":"client_credentials"}',
    //     }
    // );
    // console.log(token);
    const id = req.params.id;
    const data = req.body;
    const exercise = await Exercise.findById(id).populate('tests');
    const counterCorrect = await runTests(exercise, data.solution);
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
    res.status(500).send(error);
  }
});

router.put('/editExercise', async (req, res) => {
  try {
    const { id, tests } = req.body;
    let testsToAdd = [];
    for (let i = 0; i < tests.length; i++) {
      const element = tests[i];
      const newTest = await Test({
        input: element.input,
        output: element.output,
        exercise: id,
      }).save();
      testsToAdd.push(newTest._id);
    }
    await Exercise.findByIdAndUpdate(id, { ...req.body, tests: testsToAdd });
    const data = await Exercise.findById(id).populate(['author', 'tests']);
    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.put('/checkExercise/:id', async (req, res) => {
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
    res.status(500).send(error);
  }
});

router.delete('/deleteExercise/:id', async (req, res) => {
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
    res.status(500).send(error);
  }
});

router.put('/checkVersus/:exerciseId', async (req, res) => {
  try {
    const id = req.params.exerciseId;
    const data = req.body;
    const exercise = await Exercise.findById(id).populate('tests');
    const counterCorrect = await runTests(exercise, data.solution);
    if (counterCorrect === exercise.tests.length) {
      const user = await User.findById(data.user);
      const versusResult = {
        wonVersus: data.won ? user.wonVersus + 1 : data.won,
        lostVersus: data.won ? user.lostVersus : user.lostVersus + 1,
      };
      if (!user.doneExercises.includes(exercise._id)) {
        await User.findByIdAndUpdate(data.user, {
          doneExercises: [...user.doneExercises, exercise._id],
          ...versusResult,
        });
      }
      await Exercise.findByIdAndUpdate(id, {
        doneCounter: exercise.doneCounter + 1,
        ...versusResult,
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

module.exports = router;

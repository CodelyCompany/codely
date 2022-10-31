const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Exercise = require('../models/Exercise');
const Review = require('../models/Review');
const Test = require('../models/Test');
const axios = require('axios');
const backendContainersAddress =
  process.env.BACKEND_CONTAINERS || 'http://localhost:5001';

router.get('/', async (req, res) => {
  try {
    const data = await Exercise.find({}).populate('author');
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Exercise.findById(id);
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
    res.status(200).send(data.preparedExcercises);
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
    const user = await User.findById(data.author);
    const newExercise = new Exercise({
      title: data.title,
      description: data.description,
      difficulty: data.difficulty,
      author: user._id,
      programmingLanguage: data.programmingLanguage,
      correctOutput: data.correctOutput,
      hints: data.hints,
      exampleSolution: data.exampleSolution,
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
      preparedExcercises: [...user.preparedExcercises, newExercise._id],
    });
    return res.status(200).send(newExercise);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post('/checkSolution/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const exercise = await Exercise.findById(id).populate('tests');
    let counterCorrect = 0;
    for (let i = 0; i < exercise.tests.length; i++) {
      const element = exercise.tests[i];
      const response = await axios.post(
        backendContainersAddress +
          '/' +
          exercise.programmingLanguage.toLowerCase(),
        {
          toExecute: data.solution,
          args: element.input,
        }
      );
      const res1 = response.data.output.replace(/(\r\n|\n|\r)/gm, '');
      const res2 = element.output.replace(/(\r\n|\n|\r)/gm, '');
      if (res1 === res2) {
        counterCorrect++;
      }
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
    const id = req.body._id;
    await Exercise.findByIdAndUpdate(id, req.body);
    return res.status(200).send(id);
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
        preparedExcercises: user.preparedExcercises.filter(
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
    return res.status(200).send(id);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;

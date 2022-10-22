const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Exercise = require('../models/Exercise');
const Comment = require('../models/Comment');

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
    });
    await newExercise.save();
    await User.findByIdAndUpdate(user._id, {
      preparedExcercises: [...user.preparedExcercises, newExercise._id],
    });
    return res.status(200).send(newExercise);
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
    await Comment.deleteMany({
      exercise: exercise._id,
    });
    return res.status(200).send(id);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;

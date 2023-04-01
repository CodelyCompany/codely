const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Exercise = require('../models/Exercise');
const Review = require('../models/Review');

router.get('/', async (req, res) => {
  try {
    const data = await Review.find({});
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Review.findById(id);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findById(data.author);
    const exercise = await Exercise.findById(data.exercise);
    const newReview = new Review({
      rating: data.rating,
      comment: data.comment,
      author: user._id,
      exercise: exercise._id,
      creationDate: Date.now(),
      upvotes: [],
      downvotes: [],
    });
    await newReview.save();
    await User.findByIdAndUpdate(user._id, {
      writtenReviews: [...user.writtenReviews, newReview._id],
    });
    await Exercise.findByIdAndUpdate(exercise._id, {
      reviews: [...exercise.reviews, newReview._id],
    });
    return res.status(200).send(newReview);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.put('/', async (req, res) => {
  try {
    const id = req.body._id;
    const inDb = await Review.findById(id);
    const updated =
      req.body.comment === inDb.comment
        ? req.body
        : { ...req.body, editedAt: Date.now() };
    await Review.findByIdAndUpdate(id, updated);
    return res.status(200).send(updated);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;

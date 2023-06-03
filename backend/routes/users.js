const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const Exercise = require('../models/Exercise');
const Review = require('../models/Review');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  try {
    const data = await User.find({})
      .populate(['preparedExercises', 'doneExercises'])
      .lean()
      .exec();
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findById(id).populate([
      'preparedExercises',
      'doneExercises',
    ]);
    const dividedExercises = data.preparedExercises.reduce(
      (acc, curr) => {
        if (curr.checked) {
          return {
            ...acc,
            checkedExercises: [...acc.checkedExercises, curr],
          };
        }
        return {
          ...acc,
          uncheckedExercises: [...acc.uncheckedExercises, curr],
        };
      },
      { checkedExercises: [], uncheckedExercises: [] }
    );
    const response = {
      ...data._doc,
      preparedExercises: dividedExercises,
      checkedPreparedExercises: dividedExercises.checkedExercises.length,
      uncheckedPreparedExercises: dividedExercises.uncheckedExercises.length,
    };
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const checkUser = await User.find({ username: data.username });
    if (checkUser.length > 0) {
      return res.status(200).send(checkUser[0]);
    } else {
      const newUser = new User({
        username: data.username,
      });
      const toSend = await newUser.save();
      return res.status(200).send(toSend);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.put('/', async (req, res) => {
  try {
    const { _id, theme } = req.body;
    await User.updateOne({ _id }, { theme });
    const updatedUser = await User.findOne({ _id });
    return res.status(200).send(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.patch('/:id/avatar', upload.single('avatar'), async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      avatarFile: {
        data: new Buffer.from(req.file.buffer, 'base64'),
        contentType: req.file.mimetype,
      },
    });
    const result = await User.findOne({ _id: req.params.id }).lean().exec();
    return res.status(200).send(result);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something went wrong');
  }
});

module.exports = router;

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const Exercise = require('../models/Exercise');
const Review = require('../models/Review');

const router = express.Router();
const upload = multer({ dest: path.join(__dirname, '../temp') });

router.get('/', async (req, res) => {
  try {
    const data = await User.find({}).populate([
      'preparedExercises',
      'doneExercises',
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
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post('/addUser', async (req, res) => {
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
    res.status(500).send(error);
  }
});

router.put('/editUser', async (req, res) => {
  try {
    const data = req.body;
    await User.updateOne({ _id: data._id }, { theme: data.theme });
    const updatedUser = await User.findOne({ _id: data._id });
    console.log(updatedUser);
    return res.status(200).send(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.delete('/deleteUserExercise/:id', async (req, res) => {
  try {
    const data = req.params;
    const account = await User.findById(data.id);
    const exercise = await Exercise.find({
      author: account._id,
    });
    exercise.forEach(async (n) => {
      await Review.deleteMany({
        exercise: n._id,
      });
    });
    await Exercise.deleteMany({
      author: account._id,
    });
    await Review.updateMany(
      {
        author: account._id,
      },
      { author: null }
    );
    await User.findByIdAndDelete(data.id);
    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.delete('/deleteUser/:id', async (req, res) => {
  try {
    const data = req.params;
    const account = await User.findById(data.id);
    await Exercise.updateMany(
      {
        author: account._id,
      },
      { author: null }
    );
    await Review.updateMany(
      {
        author: account._id,
      },
      { author: null }
    );
    await User.findByIdAndDelete(data.id);
    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


router.get('/:id/avatar', (req, res) => {
  try {
    res.status(200).sendFile(path.join(__dirname, `../avatars/${req.params.id}.png`));  
  } catch (err) {
    res.sendStatus(404);
  }
});

router.patch('/:id/avatar', upload.single('avatar'), async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, `../avatars/${req.params.id}.png`);
    user.avatarTimestamp = Date.now();
  
    if (!fs.existsSync(path.join(__dirname, '../avatars')))
      fs.mkdirSync(path.join(__dirname, '../avatars'));
  
    if (path.extname(req.file.originalname) === ".png") {
      fs.renameSync(tempPath, targetPath);
    } else res.status(400).send('Only .png images are accepted');
  
    user.save();
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;

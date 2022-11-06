const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Exercise = require('../models/Exercise');
const Comment = require('../models/Comment');
const Test = require('../models/Test');
const axios = require('axios');
require('dotenv').config();
const backendContainersAddress =
    process.env.APP_BACKEND_CONTAINERS || 'http://localhost:5001';

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
            preparedExercises: [...user.preparedExercises, newExercise._id],
        });
        return res.status(200).send(newExercise);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post('/checkSolution/:id', async (req, res) => {
    try {
        const token = await axios.post(
            `https://${process.env.APP_DOMAIN}/oauth/token`,
            {
                client_id: process.env.APP_CONTAINERS_CLIENT_ID,
                client_secret: process.env.APP_CONTAINERS_CLIENT_SECRET,
                audience: `${
                    process.env.APP_CONTAINERS_ADDRESS ||
                    'http://localhost:5001'
                }`,
                grant_type: 'client_credentials',
            }
        );
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
                },
                {
                    headers: {
                        Authorization: `Bearer ${token.data.access_token}`,
                    },
                }
            );
            const res1 = response.data.output.replace(/(\r\n|\n|\r)/gm, '');
            const res2 = element.output.replace(/(\r\n|\n|\r)/gm, '');
            if (res1 === res2) {
                counterCorrect++;
            }
        }
        if (counterCorrect === exercise.tests.length) {
            const user = await User.findById(data.user);
            await User.findByIdAndUpdate(data.user, {
                doneExercises: [...user.doneExercises, exercise._id],
            });
            await Exercise.findByIdAndUpdate(id, {
                doneCounter: exercise.doneCounter + 1,
            });
        }
        return res
            .status(200)
            .send({ tests: exercise.tests.length, correct: counterCorrect });
    } catch (error) {
        // console.log(error);
        res.status(500).send(error);
    }
});

router.put('/editExercise', async (req, res) => {
    try {
        const { id, tests } = req.body;
        let testsToAdd = [];
        for (let i = 0; i < tests.length; i++) {
            const element = tests[i];
            const newTest = new Test({
                input: element.input,
                output: element.output,
                exercise: id,
            });
            await newTest.save();
            testsToAdd.push(newTest._id);
        }
        await Exercise.findByIdAndUpdate(id, {
            ...req.body,
            tests: testsToAdd,
        });
        const data = await Exercise.findById(id).populate(['author', 'tests']);
        return res.status(200).send(data);
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
        await Comment.deleteMany({
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

module.exports = router;

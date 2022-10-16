const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Exercise = require("../models/Exercise");

router.get("/", async (req, res) => {
    try {
        const data = await User.find({});
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findById(id);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post("/addUser", async (req, res) => {
    try {
        const data = req.body;
        const newUser = new User({
            username: data.username,
        });
        await newUser.save();
        return res.status(200).send(true);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.put("/editUser", async (req, res) => {
    try {
        const data = req.body;
        await User.findByIdAndUpdate(data.id, {
            username: data.username,
        });
        return res.status(200).send(true);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.delete("/deleteUserExercise/:id", async (req, res) => {
    try {
        const data = req.params;
        const account = await User.findById(data.id);
        await Exercise.deleteMany({
            author: account._id,
        });
        await User.findByIdAndDelete(data.id);
        return res.status(200).send(true);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.delete("/deleteUser/:id", async (req, res) => {
    try {
        const data = req.params;
        const account = await User.findById(data.id);
        await Exercise.updateMany(
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

module.exports = router;
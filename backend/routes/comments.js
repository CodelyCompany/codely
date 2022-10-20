const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Exercise = require("../models/Exercise");
const Comment = require("../models/Comment");

router.get("/", async (req, res) => {
    try {
        const data = await Comment.find({});
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Comment.findById(id);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get("/exercise/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Exercise.findById(id).populate("comments");
        res.status(200).send(data.preparedExcercises);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post("/addComment", async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findById(data.author);
        const exercise = await Exercise.findById(data.exercise);
        const newComment = new Comment({
            title: data.title,
            comment: data.comment,
            author: user._id,
            exercise: exercise._id,
        });
        await newComment.save();
        await User.findByIdAndUpdate(user._id, {
            writtenComments: [...user.writtenComments, newComment._id],
        });
        await Exercise.findByIdAndUpdate(exercise._id, {
            comments: [...exercise.comments, newComment._id],
        });
        return res.status(200).send(true);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.put("/editComment", async (req, res) => {
    try {
        const id = req.body._id;
        await Comment.findByIdAndUpdate(id, req.body);
        return res.status(200).send(id);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.delete("/deleteComment/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const comment = await Comment.findById(id);
        await Comment.findByIdAndDelete(id);
        const user = await User.findById(comment.author);
        const exercise = await Exercise.findById(comment.exercise);
        if (user) {
            await User.findByIdAndUpdate(comment.author, {
                writtenComments: user.writtenComments.filter(
                    (n) => n.toString() !== id.toString()
                ),
            });
        }
        return res.status(200).send(id);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;

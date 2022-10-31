const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Exercise = require("../models/Exercise");
const Review = require("../models/Review");

router.get("/", async (req, res) => {
    try {
        const data = await Review.find({});
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Review.findById(id);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get("/exercise/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Exercise.findById(id).populate("reviews");
        res.status(200).send(data.preparedExcercises);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post("/addReview", async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findById(data.author);
        const exercise = await Exercise.findById(data.exercise);
        const newReview = new Review({
            title: data.title,
            review: data.review,
            author: user._id,
            exercise: exercise._id,
            upvotes: [],
            downvotes: []
        });
        await newReview.save();
        await User.findByIdAndUpdate(user._id, {
            writtenReviews: [...user.writtenReviews, newReview._id],
        });
        await Exercise.findByIdAndUpdate(exercise._id, {
            reviews: [...exercise.reviews, newReview._id],
        });
        return res.status(200).send(true);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.put("/editReview", async (req, res) => {
    try {
        const id = req.body._id;
        await Review.findByIdAndUpdate(id, { ...req.body, editedAt: new Date().now() });
        const updated = await Review.findById(id);
        return res.status(200).send(updated);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.delete("/deleteReview/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const review = await Review.findById(id);
        await Review.findByIdAndDelete(id);
        const user = await User.findById(comment.author);
        const exercise = await Exercise.findById(review.exercise);
        if (user) {
            await User.findByIdAndUpdate(review.author, {
                writtenReviews: user.writtenReviews.filter(
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

router.patch('/upvote', async (req, res) => {
    try {
        const review = await Review.findById(req.body._id);
        review.upvotes = 
            review.upvotes.includes(req.body._id) ? 
            review.upvotes.filter(id => id != req.body._id) :
            [...review.upvotes, req.body.user_id];
        await review.save();
        return res.status(200).send(review);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.patch('/downvote', async (req, res) => {
    try {
        const review = await Review.findById(req.body._id);
        review.downvotes = 
            review.downvotes.includes(req.body._id) ? 
            review.downvotes.filter(id => id != req.body._id) :
            [...review.downvotes, req.body.user_id];
        await review.save();
        return res.status(200).send(review);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;

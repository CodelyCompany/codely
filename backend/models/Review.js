const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: { type: String, minlength: 2, maxlength: 5000 },
    upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    author: { type: Schema.Types.ObjectId, ref: "User" },
    exercise: { type: Schema.Types.ObjectId, ref: "Exercise" },
    creationDate: { type: Date, default: Date.now },
    editedAt: { type: Date }
});

module.exports = model("Review", reviewSchema);

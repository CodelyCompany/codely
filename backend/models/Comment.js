const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    comment: { type: String, minlength: 2, maxlength: 5000 },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    exercise: { type: Schema.Types.ObjectId, ref: "Exercise" },
    creationDate: { type: Date, default: Date.now },
});

module.exports = model("Comment", commentSchema);

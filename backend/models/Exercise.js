const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        unique: true,
    },
    creationDate: { type: Date, default: Date.now },
    description: { type: String, maxlength: 5000 },
    difficulty: { type: Number, min: 1, max: 5 },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    programmingLanguage: {
        type: String,
        required: true,
        maxlength: 50,
    },
    correctOutput: {
        type: String,
        required: true,
        maxlength: 2000,
    },
    doneCounter: { type: Number, default: 0 },
    hints: [{ type: String, maxlength: 1000 }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = model("Exercise", exerciseSchema);

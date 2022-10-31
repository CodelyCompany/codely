const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        unique: true,
    },
    creationDate: { type: Date, default: Date.now },
    preparedExcercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
    doneExcercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
    writtenReviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

module.exports = model("User", userSchema);

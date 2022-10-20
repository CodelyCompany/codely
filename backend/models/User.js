const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        unique: true,
    },
    preparedExcercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
    doneExcercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
});

module.exports = model("User", userSchema);

const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    preparedExcercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
});

module.exports = model("User", userSchema);

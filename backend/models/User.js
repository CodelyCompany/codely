const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        unique: true,
    },
    creationDate: { type: Date, default: Date.now },
    preparedExercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
    doneExercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
    writtenComments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

module.exports = model('User', userSchema);

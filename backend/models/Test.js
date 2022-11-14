const { Schema, model } = require('mongoose');

const testSchema = new Schema({
    input: {
        type: [String],
        maxlength: 10,
    },
    output: {
        type: String,
        maxlength: 5000,
    },
    exercise: {
        type: Schema.Types.ObjectId,
        ref: 'Exercise',
    },
});

module.exports = model('Test', testSchema);

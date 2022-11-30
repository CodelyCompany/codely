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
  writtenReviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  wonVersus: {
    type: Number,
    default: 0,
  },
  lostVersus: {
    type: Number,
    default: 0,
  },
});

module.exports = model('User', userSchema);

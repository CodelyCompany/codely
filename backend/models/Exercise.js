const { Schema, model } = require('mongoose');

const exerciseSchema = new Schema({
  title: {
    type: String,
    minlength: 3,
    maxlength: 50,
    unique: true,
  },
  functionName: { type: String, minlength: 1, maxlength: 50 },
  creationDate: { type: Date, default: Date.now },
  description: { type: String, maxlength: 5000 },
  difficulty: { type: Number, min: 1, max: 5 },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  programmingLanguage: {
    type: String,
    maxlength: 50,
  },
  doneCounter: { type: Number, default: 0 },
  hints: [{ type: String, maxlength: 1000 }],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  exampleSolution: { type: String, maxlength: 5000 },
  tests: [{ type: Schema.Types.ObjectId, ref: 'Test' }],
  checked: { type: Boolean, default: false },
  argumentsName: [{ type: String }],
  types: [{ type: String }],
  functionSignature: { type: String },
  step: { type: Number, default: 2 }, // steps: [2, 3, 4, 5, 6], 6 means that exercise is created
});

module.exports = model('Exercise', exerciseSchema);

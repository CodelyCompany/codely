const { Schema, model } = require('mongoose');

const exerciseSchema = new Schema({
  title: {
    type: String,
    required: true,
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
    required: true,
    maxlength: 50,
  },
  doneCounter: { type: Number, default: 0 },
  hints: [{ type: String, maxlength: 1000 }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  exampleSolution: { type: String, maxlength: 5000 },
  tests: [{ type: Schema.Types.ObjectId, ref: 'Test' }],
  checked: { type: Boolean, default: false },
  argumentsName: [{ type: String }],
  types: [{ type: String }],
});

module.exports = model('Exercise', exerciseSchema);

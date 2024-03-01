const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  },
  allAnswers: {
    type: [String],
    required: true
  }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;

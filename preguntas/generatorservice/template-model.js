const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  query: {
    type: String,
    required: true
  }
});


const Template = mongoose.model('Template', templateSchema);


module.exports = Template

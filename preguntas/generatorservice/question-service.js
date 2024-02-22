// Import necessary modules and dependencies
const express = require('express');
const mongoose = require('mongoose');
const Question = require('./question-model');
const Template = require('./template-model');
const axios = require('axios');

// Create an instance of Express
const app = express();
const port = 8003;

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/questiondb';

const endpointUrl = 'https://query.wikidata.org/sparql';

mongoose.connect(mongoUri);

//Function to search a random template
const searchRandomTemplate = async () => {
  const template = await Template.findOne({});  
  return template;
}

const executeQuery = async (template) => {
  try {
    const settings = {
      headers: { Accept: 'application/sparql-results+json' },
      params: { query: template.query }
    };
    const { data } = await axios.get(endpointUrl, settings);
    const formattedResults = data.results.bindings.map(function(binding) {
      return {
          pLabel: binding.pLabel.value,
          rLabel: binding.rLabel.value
      };
    });
    return formattedResults;
  } catch (error) {
    console.error("Error al ejecutar la consulta SPARQL:", error);
    return null;
  }
}

// Define a route to generate and store a question
app.get('/generate-question', async (req, res) => {
  try {
    // Search a random template
    const template = await searchRandomTemplate();

    //Execute the query
    const formattedResults = await executeQuery(template);
    
    //Select random formatted result
    const randomIndex = Math.floor(Math.random() * formattedResults.length);
    const randomResult = formattedResults[randomIndex];

    // Add pLabel to question string from template
    const question = template.question.replace('^', randomResult.pLabel);

    // Create a new question
    const newQuestion = new Question({
      question: question,
      correctAnswer: randomResult.rLabel
    });

    newQuestion.save();
    // Return the question as a JSON response
    res.json(newQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const server = app.listen(port, () => {
    console.log(`User Service listening at http://localhost:${port}`);
});

// Listen for the 'close' event on the Express.js server
server.on('close', () => {
    // Close the Mongoose connection

    mongoose.connection.close();
  });

  module.exports = server
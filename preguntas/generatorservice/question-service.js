// Import necessary modules and dependencies
const express = require('express');
const mongoose = require('mongoose');
const Question = require('./question-model');
const Template = require('./template-model');
// Create an instance of Express
const app = express();
const port = 8003;

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/questiondb';
const mongoUri1 = process.env.MONGODB_URI || 'mongodb://localhost:27017/templatedb';

questions = mongoose.createConnection(mongoUri);
templates = mongoose.createConnection(mongoUri1);
// Define a route to generate and store a question
app.get('/generate-question', async (req, res) => {
  try {
    

    // Return the question as a JSON response
    res.json(Question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate question' });
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
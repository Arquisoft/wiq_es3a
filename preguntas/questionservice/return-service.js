// Import necessary modules and dependencies
const express = require('express');
const mongoose = require('mongoose');
const Question = require('./question-model');

// Create an instance of Express
const app = express();
const port = 8004;

// Middleware to parse JSON in request body
app.use(express.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/questiondb';
mongoose.connect(mongoUri)

app.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        
    }
    });

    // Start the server
const server = app.listen(port, () => {
    console.log(`Return service listening at http://localhost:${port}`);
  });
  
  server.on('close', () => {
      // Close the Mongoose connection
      mongoose.connection.close();
    });
  
  module.exports = server
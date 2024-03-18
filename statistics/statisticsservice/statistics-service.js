// statistics-service.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const Statistic = require('./user-model')

const app = express();
const port = 8006;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb';
mongoose.connect(mongoUri);



// Function to validate required fields in the request body
function validateRequiredFields(req, requiredFields) {
    for (const field of requiredFields) {
      if (!(field in req.body)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
}

app.post('/addStatistic', async (req, res) => {
    try {
        // Check if required fields are present in the request body
        validateRequiredFields(req, ['username', 'rigthAnswers', 'wrongAnswers']);

        // Encrypt the password before saving it
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newStatistic = new Statistic({
            username: req.body.username,
            rigthAnswers:rigthAnswers,
            wrongAnswers:wrongAnswers
        });

        await newStatistic.save();
        res.json(newStatistic);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }});
    
    app.get('/statistics/:userId', async (req, res) => {
      try {
        const userId = req.params.userId;
        // Buscar las estadísticas asociadas al userId
        const userStatistics = await Statistic.findOne({ userId });
        if (!userStatistics) {
          return res.status(404).json({ message: 'No se encontraron estadísticas para el usuario.' });
        }
    
        res.status(200).json(userStatistics); // Enviar las estadísticas como respuesta
      } catch (error) {
        console.error('Error al obtener estadísticas del usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener estadísticas del usuario.' });
      }

    });

const server = app.listen(port, () => {
  console.log(`User Service listening at http://localhost:${port}`);
});

// Listen for the 'close' event on the Express.js server
server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
  });

module.exports = server
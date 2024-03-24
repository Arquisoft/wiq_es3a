// statistics-service.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const Statistic = require('./user-model')
const cors = require('cors')

const app = express();
const port = 8006;

// Middleware to parse JSON in request body
app.use(bodyParser.json());
app.use(cors());

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
      console.log("entra por add statistic de statistic service")
         
        const userId = req.body.username;
        const userStatistics = await Statistic.findOne({username: userId });
       
        userStatistics.gamesPlayed++; // Incrementar el contador de juegos jugados
        userStatistics.rigthAnswers += req.body.rigthAnswers; // Sumar las respuestas correctas
        userStatistics.wrongAnswers += req.body.wrongAnswers; // Sumar las respuestas incorrectas

        await userStatistics.save(); // Guardar las estadísticas actualizadas en la base de datos
        res.json(userStatistics);
      }
   catch (error) {
      res.status(400).json({ error: error.message }); 
    }});
    
    app.get('/statistics', async (req, res) => {
      try {
        const userId = req.query.userId;
        // Buscar las estadísticas asociadas al userId
        const userStatistics = await Statistic.findOne({username: userId });
        if (!userStatistics) {
          throw new Error('Usuario no encontrado');
      }
        if (!userStatistics) {
          console.log( 'No se encontraron estadísticas para el usuario.' )
          return res.status(404).json({ message: 'No se encontraron estadísticas para el usuario.' });
        }
    
        res.status(200).json(userStatistics); // Enviar las estadísticas como respuesta
      } catch (error) {
        console.error('Error al obtener estadísticas del usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener estadísticas del usuario.' });
      }
   
    });

const server = app.listen(port, () => {
  console.log(`Statistics Service listening at http://localhost:${port}`);
});

// Listen for the 'close' event on the Express.js server
server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
  });

module.exports = server
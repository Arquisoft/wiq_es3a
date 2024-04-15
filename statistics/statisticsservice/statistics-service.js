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



app.post('/addStatistic', async (req, res) => {
    try {    
        const userId = req.body.username;
        const userStatistics = await Statistic.findOne({username: userId.toString() });
       
        userStatistics.gamesPlayed++; // Incrementar el contador de juegos jugados
        userStatistics.rigthAnswers += req.body.rigthAnswers; // Sumar las respuestas correctas
        userStatistics.wrongAnswers += req.body.wrongAnswers; // Sumar las respuestas incorrectas
        userStatistics.totalTime+=req.body.time;
        userStatistics.avgTime=(userStatistics.totalTime/userStatistics.gamesPlayed);

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
        const userStatistics = await Statistic.findOne({username: userId.toString() });
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

   
    app.get('/ranking/accuracy', async (req, res) => {
      try {
        const users = await Statistic.find(); // Obtener todos los usuarios
        const rankedUsers = users.map(user => {
          const accuracy = (user.rigthAnswers / (user.gamesPlayed*10)) * 100; // Calcular porcentaje de aciertos
          const roundedAccuracy = accuracy % 1 === 0 ? accuracy : accuracy.toFixed(2); // Redondear solo si tiene decimales
          return { username: user.username, accuracy: roundedAccuracy }; // Crear objeto con nombre de usuario y porcentaje de aciertos redondeado si es necesario
        });
        const sortedRanking = rankedUsers.sort((a, b) => b.accuracy - a.accuracy); // Ordenar usuarios por porcentaje de aciertos
        res.json(sortedRanking); // Devolver ranking ordenado
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });
    
    

    app.get('/ranking/correctAnswers', async (req, res) => {
      try {
        const users = await Statistic.find(); // Obtener todos los usuarios
        // Ordenar usuarios por respuestas correctas
        const sortedRanking = users.sort((a, b) => b.rigthAnswers - a.rigthAnswers);
        // Mapear los usuarios para devolver el ranking ordenado junto con el número de respuestas correctas de cada usuario
        const rankedUsers = sortedRanking.map(user => ({
          username: user.username,
          correctAnswers: user.rigthAnswers,
        }));
        res.json(rankedUsers); // Devolver ranking ordenado con número de respuestas correctas de cada usuario
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });
    app.get('/ranking/gamesPlayed', async (req, res) => {
      try {
        const users = await Statistic.find(); 
        const sortedRanking = users.sort((a, b) => b.gamesPlayed - a.gamesPlayed);
        const rankedUsers = sortedRanking.map(user => ({
          username: user.username,
          gamesPlayed: user.gamesPlayed,
        }));
        res.json(rankedUsers);
      } catch (err) {
        res.status(500).json({ message: err.message });
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
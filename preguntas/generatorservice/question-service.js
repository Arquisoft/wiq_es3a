// Import necessary modules and dependencies
const express = require('express');
const mongoose = require('mongoose');
const Question = require('./question-model');
const Template = require('./template-model');
const axios = require('axios');
const templateData = require('./data/data.json');

// Create an instance of Express
const app = express();
const port = 8003;

/**
//Constante para el tamaño de imagenes
const widthSize = 140;
*/

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/questiondb';

const endpointUrl = 'https://query.wikidata.org/sparql';

mongoose.connect(mongoUri)
  .then(() => {return Template.deleteMany({})})
  .then(() => {return Template.insertMany(templateData)});

//Function to search a random template
const searchRandomTemplate = async () => {

  // Search a random template
  const template = await Template.aggregate([{ $sample: { size: 1 } }]);
  return template[0];
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

    //Generación de índices aleatorios y diferentes
    let randomIndex0, randomIndex1, randomIndex2, randomIndex3;
    do {
        randomIndex0 = Math.floor(Math.random() * formattedResults.length);
        randomIndex1 = Math.floor(Math.random() * formattedResults.length);
        randomIndex2 = Math.floor(Math.random() * formattedResults.length);
        randomIndex3 = Math.floor(Math.random() * formattedResults.length);
    } while (formattedResults[randomIndex0].rLabel === formattedResults[randomIndex1].rLabel || 
      formattedResults[randomIndex0].rLabel === formattedResults[randomIndex2].rLabel || 
      formattedResults[randomIndex0].rLabel === formattedResults[randomIndex3].rLabel || 
      formattedResults[randomIndex1].rLabel === formattedResults[randomIndex2].rLabel || 
      formattedResults[randomIndex1].rLabel === formattedResults[randomIndex3].rLabel || 
      formattedResults[randomIndex2].rLabel === formattedResults[randomIndex3].rLabel);

    //Creación de respuestas
    const correctAnswer = formattedResults[randomIndex0];
    const wrongAnswer1 = formattedResults[randomIndex1];
    const wrongAnswer2 = formattedResults[randomIndex2];
    const wrongAnswer3 = formattedResults[randomIndex3];

    /** 
    //Cambio de URL. Imagen redimensionada
    if (correctAnswer.rLabel.includes('upload.wikimedia.org')) {
      correctAnswer.rLabel = getThumbUrl(correctAnswer.rLabel, widthSize);
      wrongAnswer1.rLabel = getThumbUrl(wrongAnswer1.rLabel, widthSize);
      wrongAnswer2.rLabel = getThumbUrl(wrongAnswer2.rLabel, widthSize);
      wrongAnswer3.rLabel = getThumbUrl(wrongAnswer3.rLabel, widthSize);
    }*/

    //Creación de array desordenado con todas las respuestas
    const allAnswersSorted = [correctAnswer.rLabel, wrongAnswer1.rLabel, wrongAnswer2.rLabel, wrongAnswer3.rLabel];
    const allAnswers = shuffleArray(allAnswersSorted);

    // Add pLabel to question string from template
    const question = template.question.replace('^', correctAnswer.pLabel);

    //Cambio de formato de numero. Se intenta hacer más legible
    if (question.includes('superficie') || question.includes('área')) {
      correctAnswer.rLabel = await formatoNumero(correctAnswer.rLabel);
      for (let i = 0; i < allAnswers.length; i++) {
        allAnswers[i] = await formatoNumero(allAnswers[i]);
      }
    }

    // Create a new question
    const newQuestion = new Question({
      question: question,
      correctAnswer: correctAnswer.rLabel,
      allAnswers: allAnswers
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

//Funcion que mezcla los elementos de un array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
/** 
function getThumbUrl(originalUrl, width) {
  // Verifica si la URL es de Wikipedia
  if (!originalUrl.includes('upload.wikimedia.org/wikipedia/commons/')) {
      return "URL no válida";
  }

  // Reemplaza la parte de la URL para obtener la versión miniatura
  let filename = originalUrl.split('/').pop();
  let thumbnailUrl = originalUrl.replace(
      "/commons/", "/commons/thumb/").replace(".svg", ".png") + "/"+ width +"px-" + filename;

  return thumbnailUrl;
}*/

//Funcion de formateo de numeros
async function formatoNumero(numero) {
  // Convertir el número a string y reemplazar puntos por comas
  let numeroStr = numero.toString().replace('.', ',');

  // Separar la parte entera de la decimal
  let partes = numeroStr.split(',');

  // Formatear la parte entera con puntos cada 3 dígitos
  partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Unir las partes nuevamente
  return partes.join(',');
}

module.exports.formatoNumero = formatoNumero;
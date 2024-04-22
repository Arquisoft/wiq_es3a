// Import necessary modules and dependencies
const express = require('express');
const mongoose = require('mongoose');
const Question = require('./question-model');
const Template = require('./template-model');
const axios = require('axios');

// Import game modes data
const sabiosData = require('./data/data-sabios.json');
const descartandoData = require('./data/data-descartando.json');
const imgData = require('./data/data-img.json');
const descubriendoData = require('./data/data-descubriendo.json');

// Create an instance of Express
const app = express();
const port = 8003;

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/questiondb';

const endpointUrl = 'https://query.wikidata.org/sparql';

mongoose.connect(mongoUri)
  .then(() => {return Template.deleteMany({})})
  .then(() => {return Template.insertMany(sabiosData)});

//Function to search a random template
const searchRandomTemplate = async () => {
  // Search a random template
  const template = await Template.aggregate([{ $sample: { size: 1 } }]);
  return template[0];
}

//Function to search a random category template
const searchRandomCategoryTemplate = async (categoria) => {
  try {
    const randomTemplate = await Template.aggregate([
      { $match: { category: categoria } }, 
      { $sample: { size: 1 } } 
    ]);

    return randomTemplate[0];
  } catch (error) {
    console.error("Error al buscar plantilla aleatoria:", error);
    throw error;
  }
};

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
    await mongoose.connect(mongoUri);
    await Template.deleteMany({});
    await Template.insertMany(sabiosData);
    
  } catch (error) {
    return res.status(500).json({ message: 'Error al resetear los datos', error });
  }

  try {
    // Search a random template
    const template = await searchRandomTemplate();

    //Execute the query
    const formattedResults = await executeQuery(template);

    const result = await generateQuestion(formattedResults, template);

    if (result.success) {
      return res.json(result.question);
    } else {
      return res.status(500).json({ error: result.error, details: result.details });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define a route to get random questions
app.get('/generate-question/aleatorio', async (req, res) => {
  try {
    await mongoose.connect(mongoUri);
    await Template.deleteMany({});
    await Template.insertMany(sabiosData);
    
  } catch (error) {
    return res.status(500).json({ message: 'Error al resetear los datos', error });
  }

  try {
    // Search a random template
    const template = await searchRandomTemplate();

    //Execute the query
    const formattedResults = await executeQuery(template);

    const result = await generateQuestion(formattedResults, template);

    if (result.success) {
      return res.json(result.question);
    } else {
      return res.status(500).json({ error: result.error, details: result.details });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define a route to get geography questions
app.get('/generate-question/geografia', async (req, res) => {
  try {
    await mongoose.connect(mongoUri);
    await Template.deleteMany({});
    await Template.insertMany(sabiosData);
    
  } catch (error) {
    return res.status(500).json({ message: 'Error al resetear los datos', error });
  }

  try {
    // Search a random template
    const template = await searchRandomCategoryTemplate("geografia");

    //Execute the query
    const formattedResults = await executeQuery(template);

    const result = await generateQuestion(formattedResults, template);

    if (result.success) {
      return res.json(result.question);
    } else {
      return res.status(500).json({ error: result.error, details: result.details });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define a route to get sports questions
app.get('/generate-question/deporte', async (req, res) => {
  try {
    await mongoose.connect(mongoUri);
    await Template.deleteMany({});
    await Template.insertMany(sabiosData);
    
  } catch (error) {
    return res.status(500).json({ message: 'Error al resetear los datos', error });
  }

  try {
    // Search a random template
    const template = await searchRandomCategoryTemplate("deporte");

    //Execute the query
    const formattedResults = await executeQuery(template);

    const result = await generateQuestion(formattedResults, template);

    if (result.success) {
      return res.json(result.question);
    } else {
      return res.status(500).json({ error: result.error, details: result.details });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define a route to get politics questions
app.get('/generate-question/politica', async (req, res) => {
  try {
    await mongoose.connect(mongoUri);
    await Template.deleteMany({});
    await Template.insertMany(sabiosData);
    
  } catch (error) {
    return res.status(500).json({ message: 'Error al resetear los datos', error });
  }

  try {
    // Search a random template
    const template = await searchRandomCategoryTemplate("politica");

    //Execute the query
    const formattedResults = await executeQuery(template);

    const result = await generateQuestion(formattedResults, template);

    if (result.success) {
      return res.json(result.question);
    } else {
      return res.status(500).json({ error: result.error, details: result.details });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define a route to get culture questions
app.get('/generate-question/cultura', async (req, res) => {
  try {
    await mongoose.connect(mongoUri);
    await Template.deleteMany({});
    await Template.insertMany(sabiosData);
    
  } catch (error) {
    return res.status(500).json({ message: 'Error al resetear los datos', error });
  }

  try {
    // Search a random template
    const template = await searchRandomCategoryTemplate("cultura");

    //Execute the query
    const formattedResults = await executeQuery(template);

    const result = await generateQuestion(formattedResults, template);

    if (result.success) {
      return res.json(result.question);
    } else {
      return res.status(500).json({ error: result.error, details: result.details });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define a route to get descartando questions
app.get('/generate-question/descartando', async (req, res) => {
  try {
    await mongoose.connect(mongoUri);
    await Template.deleteMany({});
    await Template.insertMany(descartandoData);
    
  } catch (error) {
    return res.status(500).json({ message: 'Error al resetear los datos', error });
  }

  try {
    // Search a random template
    const template = await searchRandomTemplate();

    //Execute the query
    const formattedResults = await executeQuery(template);

    const result = await generateQuestion(formattedResults, template);

    if (result.success) {
      return res.json(result.question);
    } else {
      return res.status(500).json({ error: result.error, details: result.details });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define a route to get descubriendo questions
app.get('/generate-question/descubriendociudades', async (req, res) => {
  try {
    await mongoose.connect(mongoUri);
    await Template.deleteMany({});
    await Template.insertMany(descubriendoData);
    
  } catch (error) {
    return res.status(500).json({ message: 'Error al resetear los datos', error });
  }

  try {
    // Search a random template
    const template = await searchRandomTemplate();

    //Execute the query
    const formattedResults = await executeQuery(template);

    const result = await generateQuestion(formattedResults, template);

    if (result.success) {
      return res.json(result.question);
    } else {
      return res.status(500).json({ error: result.error, details: result.details });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define a route to get image questions
app.get('/generate-question/soloimagenes', async (req, res) => {
  try {
    await mongoose.connect(mongoUri);
    await Template.deleteMany({});
    await Template.insertMany(imgData);
    
  } catch (error) {
    return res.status(500).json({ message: 'Error al resetear los datos', error });
  }

  try {
    // Search a random template
    const template = await searchRandomTemplate();

    //Execute the query
    const formattedResults = await executeQuery(template);

    const result = await generateQuestion(formattedResults, template);

    if (result.success) {
      return res.json(result.question);
    } else {
      return res.status(500).json({ error: result.error, details: result.details });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Refactorización de codigo generación de preguntas
const generateQuestion = async (formattedResults, template) => {
  try {
    let randomIndex0, randomIndex1, randomIndex2, randomIndex3;
    do {
      randomIndex0 = Math.floor(Math.random() * formattedResults.length);
      randomIndex1 = Math.floor(Math.random() * formattedResults.length);
      randomIndex2 = Math.floor(Math.random() * formattedResults.length);
      randomIndex3 = Math.floor(Math.random() * formattedResults.length);
    } while (
      formattedResults[randomIndex0].rLabel === formattedResults[randomIndex1].rLabel ||
      formattedResults[randomIndex0].rLabel === formattedResults[randomIndex2].rLabel ||
      formattedResults[randomIndex0].rLabel === formattedResults[randomIndex3].rLabel ||
      formattedResults[randomIndex1].rLabel === formattedResults[randomIndex2].rLabel ||
      formattedResults[randomIndex1].rLabel === formattedResults[randomIndex3].rLabel ||
      formattedResults[randomIndex2].rLabel === formattedResults[randomIndex3].rLabel
    );

    const correctAnswer = formattedResults[randomIndex0];
    const wrongAnswer1 = formattedResults[randomIndex1];
    const wrongAnswer2 = formattedResults[randomIndex2];
    const wrongAnswer3 = formattedResults[randomIndex3];

    const allAnswersSorted = [correctAnswer.rLabel, wrongAnswer1.rLabel, wrongAnswer2.rLabel, wrongAnswer3.rLabel];
    const allAnswers = shuffleArray(allAnswersSorted);

    const question = template.question.replace('^', correctAnswer.pLabel);

    if (question.includes('superficie') || question.includes('área')) {
      correctAnswer.rLabel = await formatoNumero(correctAnswer.rLabel);
      for (let i = 0; i < allAnswers.length; i++) {
        allAnswers[i] = await formatoNumero(allAnswers[i]);
      }
    }

    const newQuestion = new Question({
      question: question,
      correctAnswer: correctAnswer.rLabel,
      allAnswers: allAnswers,
    });

    await newQuestion.save();
    return { success: true, question: newQuestion };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Internal Server Error', details: error };
  }
};

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
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const promBundle = require('express-prom-bundle');
//libraries required for OpenAPI-Swagger
const swaggerUi = require('swagger-ui-express'); 
const fs = require("fs")
const YAML = require('yaml')

const app = express();
const port = 8000;

const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:8002';
const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:8001';
const statisticssServiceUrl = process.env.STATS_SERVICE_URL || 'http://localhost:8006';
const generatorServiceUrl = process.env.GENERATOR_SERVICE_URL || 'http://localhost:8003';
const questionServiceUrl = process.env.QUESTION_SERVICE_URL || 'http://localhost:8004';

app.use(cors());
app.use(express.json());

//Prometheus configuration
const metricsMiddleware = promBundle({includeMethod: true});
app.use(metricsMiddleware);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'OK' });
});

app.post('/login', async (req, res) => {
  try {
    // Forward the login request to the authentication service
    const authResponse = await axios.post(authServiceUrl+'/login', req.body);
    res.json(authResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.post('/adduser', async (req, res) => {
  try {
    // Forward the add user request to the user service
    const userResponse = await axios.post(userServiceUrl+'/adduser', req.body);
    res.json(userResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/generate-question', async (req, res) => {
  try {
    // Forward the generate question request to the question service
    const bearerHeader = req.headers['authorization'];
    if(! bearerHeader ){
        return res.sendStatus(403);
    }
    const questionResponse = await axios.get(generatorServiceUrl+'/generate-question');
    res.json(questionResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/generate-question/aleatorio', async (req, res) => {
  try {
    // Forward the generate question request to the question service
    const bearerHeader = req.headers['authorization'];
    if(! bearerHeader ){
        return res.sendStatus(403);
    }
    const questionResponse = await axios.get(generatorServiceUrl+'/generate-question/aleatorio');
    res.json(questionResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/generate-question/geografia', async (req, res) => {
  try {
    // Forward the generate question request to the question service
    const bearerHeader = req.headers['authorization'];
    if(! bearerHeader ){
        return res.sendStatus(403);
    }
    const questionResponse = await axios.get(generatorServiceUrl+'/generate-question/geografia');
    res.json(questionResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/generate-question/deporte', async (req, res) => {
  try {
    // Forward the generate question request to the question service
    const bearerHeader = req.headers['authorization'];
    if(! bearerHeader ){
        return res.sendStatus(403);
    }
    const questionResponse = await axios.get(generatorServiceUrl+'/generate-question/deporte');
    res.json(questionResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/generate-question/politica', async (req, res) => {
  try {
    // Forward the generate question request to the question service
    const bearerHeader = req.headers['authorization'];
    if(! bearerHeader ){
        return res.sendStatus(403);
    }
    const questionResponse = await axios.get(generatorServiceUrl+'/generate-question/politica');
    res.json(questionResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/generate-question/cultura', async (req, res) => {
  try {
    // Forward the generate question request to the question service
    const bearerHeader = req.headers['authorization'];
    if(! bearerHeader ){
        return res.sendStatus(403);
    }
    const questionResponse = await axios.get(generatorServiceUrl+'/generate-question/cultura');
    res.json(questionResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/generate-question/descartando', async (req, res) => {
  try {
    // Forward the generate question request to the question service
    const bearerHeader = req.headers['authorization'];
    if(! bearerHeader ){
        return res.sendStatus(403);
    }
    const questionResponse = await axios.get(generatorServiceUrl+'/generate-question/descartando');
    res.json(questionResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/generate-question/descubriendociudades', async (req, res) => {
  try {
    // Forward the generate question request to the question service
    const bearerHeader = req.headers['authorization'];
    if(! bearerHeader ){
        return res.sendStatus(403);
    }
    const questionResponse = await axios.get(generatorServiceUrl+'/generate-question/descubriendociudades');
    res.json(questionResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/generate-question/soloimagenes', async (req, res) => {
  try {
    // Forward the generate question request to the question service
    const bearerHeader = req.headers['authorization'];
    if(! bearerHeader ){
        return res.sendStatus(403);
    }
    const questionResponse = await axios.get(generatorServiceUrl+'/generate-question/soloimagenes');
    res.json(questionResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/statistics', async (req, res) => {
  try {
    const questionResponse = await axios.get(statisticssServiceUrl+'/statistics', {
      params: req.query,
    });
    res.json(questionResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/questions', async (req, res) => {
  try {
    /*const bearerHeader = req.headers['authorization'];
    if(! bearerHeader ){
      if(!localStorage.getItem("token")){
        return res.sendStatus(403);
      }      
    }*/
    // Forward the get questions request to the question service
    const questionResponse = await axios.get(questionServiceUrl+'/questions');
    res.json(questionResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});


app.post('/addStatistic', async (req, res) => {
  try {
    const questionResponse = await axios.post(statisticssServiceUrl+'/addStatistic', req.body );
    res.json(questionResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/users', async (req, res) => {
  try {
    // Forward the get questions request to the question service
    const usersResponse = await axios.get(userServiceUrl+'/users');
    res.json(usersResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/ranking/accuracy', async (req, res) => {
  try {
    const statResponse = await axios.get(statisticssServiceUrl+'/ranking/accuracy');
    res.json(statResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/ranking/correctAnswers', async (req, res) => {
  try {
    const statResponse = await axios.get(statisticssServiceUrl+'/ranking/correctAnswers');
    res.json(statResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/ranking/gamesPlayed', async (req, res) => {
  try {
    const statResponse = await axios.get(statisticssServiceUrl+'/ranking/gamesPlayed');
    res.json(statResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});


// Read the OpenAPI YAML file synchronously
openapiPath='./openapi.yaml'
if (fs.existsSync(openapiPath)) {
  const file = fs.readFileSync(openapiPath, 'utf8');

  // Parse the YAML content into a JavaScript object representing the Swagger document
  const swaggerDocument = YAML.parse(file);

  // Serve the Swagger UI documentation at the '/api-doc' endpoint
  // This middleware serves the Swagger UI files and sets up the Swagger UI page
  // It takes the parsed Swagger document as input
  app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
  console.log("Not configuring OpenAPI. Configuration file not present.")
}


// Start the gateway service
const server = app.listen(port, () => {
  console.log(`Gateway Service listening at http://localhost:${port}`);
});

module.exports = server;

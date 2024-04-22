const request = require('supertest');
const axios = require('axios');
const app = require('./gateway-service');

afterAll(async () => {
  app.close();
});

jest.mock('axios');

describe('Gateway Service', () => {
  // Mock responses from external services
  axios.post.mockImplementation((url, data) => {
    if (url.endsWith('/login')) {
      if (data.username === 'test' && data.password === 'test') {
        return Promise.reject({ response: { status: 401, data: { error: 'Error de autenticación' } } });
      } else {
        return Promise.resolve({ data: { token: 'mockedToken' } });
      }
    } else if (url.endsWith('/adduser')) {
      return Promise.resolve({ data: { userId: 'mockedUserId' } });
    } else if (url.endsWith('/addStatistic')) {
      return Promise.resolve({ data: { statisticId: 'mockedStatisticId' } });
    }
  });

  axios.get.mockImplementation((url) => {
    if (url.endsWith('/generate-question')) {
      return Promise.resolve({ data: { question: 'mockedQuestion' } });
    }else if (url.endsWith('/generate-question/aleatorio')) {
      return Promise.resolve({ data: { question: 'mockedQuestion' } });
    }else if (url.endsWith('/generate-question/geografia')) {
      return Promise.resolve({ data: { question: 'mockedQuestion' } });
    }else if (url.endsWith('/generate-question/deporte')) {
      return Promise.resolve({ data: { question: 'mockedQuestion' } });
    }else if (url.endsWith('/generate-question/politica')) {
      return Promise.resolve({ data: { question: 'mockedQuestion' } });
    }else if (url.endsWith('/generate-question/cultura')) {
      return Promise.resolve({ data: { question: 'mockedQuestion' } });
    }else if (url.endsWith('/generate-question/descartando')) {
      return Promise.resolve({ data: { question: 'mockedQuestion' } });
    }else if (url.endsWith('/generate-question/descubriendociudades')) {
      return Promise.resolve({ data: { question: 'mockedQuestion' } });
    }else if (url.endsWith('/generate-question/soloimagenes')) {
      return Promise.resolve({ data: { question: 'mockedQuestion' } });
    }else if (url.endsWith('/questions')) {
      return Promise.resolve({ data: { question: 'mockedQuestion' } });
    }else if (url.endsWith('/statistics')) {
      return Promise.resolve({ data: { gamesPlayed: 'mockedGamesPlayed' ,
      rigthAnswers: 'mockedRigthAnswers', 
      wrongAnswers:'mockedWrongAnswers'  }});
    } else if (url.endsWith('/users')) {
      return Promise.resolve({ data: { users: ['mockedUser1', 'mockedUser2'] } });
    }else if(url.endsWith('/ranking/accuracy')){
      return Promise.resolve({ data: { user: 'mockedUser', accuracy:'mockedAccuracy' }});
    }else if(url.endsWith('/ranking/correctAnswers')){
      return Promise.resolve({ data: { user: 'mockedUser', accuracy:'mockedCorrectAnswers' }});
    }else if(url.endsWith('/ranking/gamesPlayed')){
      return Promise.resolve({ data: { user: 'mockedUser', accuracy:'mockedGamesPlayed' }});
    }
  });

  // Test /health endpoint
  it('debería devolver un estado de OK', async () => {
    const response = await request(app).get('/health');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: 'OK' });
  });

  // Test /login endpoint
  it('should forward login request to auth service', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBe('mockedToken');
  });

  it('debería manejar errores al intentar autenticar', async () => {
    const mockErrorResponse = { error: 'Error de autenticación' };
    const mockStatus = 401;
  
    const response = await request(app)
      .post('/login')
      .send({ username: 'test', password: 'test' });
  
    expect(response.status).toBe(mockStatus);
    expect(response.body).toEqual(mockErrorResponse);
  });

  // Test /adduser endpoint
  it('should forward add user request to user service', async () => {
    const response = await request(app)
      .post('/adduser')
      .send({ username: 'newuser', password: 'newpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body.userId).toBe('mockedUserId');
  });

  it('debería manejar errores al intentar agregar un usuario', async () => {
    const mockErrorResponse = { error: 'Error al agregar usuario' };
    const mockStatus = 500;
  
    axios.post.mockRejectedValueOnce({ response: { status: mockStatus, data: mockErrorResponse } });
  
    const response = await request(app)
      .post('/adduser')
      .send({ username: 'testuser', password: 'testpassword' });
  
    expect(response.status).toBe(mockStatus);
    expect(response.body).toEqual(mockErrorResponse);
  });

  // Test /generate-question endpoint
  it('should forward generate question request to question service', async () => {
    const response = await request(app)
      .get('/generate-question')
      .set('Authorization', 'Bearer some-token');

    if (response.statusCode !== 200) {
      console.error(response.body.error);
    }

    expect(response.statusCode).toBe(200);
    expect(response.body.question).toBe('mockedQuestion');
  });

  it('debería devolver un error 403 si no se proporciona el encabezado de autorización', async () => {
    const response = await request(app).get('/generate-question');

    expect(response.status).toBe(403);
  });

  it('debería manejar errores al intentar generar una pregunta', async () => {
    const mockErrorResponse = { error: 'Error al generar pregunta' };
    const mockStatus = 500;
  
    axios.get.mockRejectedValueOnce({ response: { status: mockStatus, data: mockErrorResponse } });
  
    const response = await request(app)
      .get('/generate-question')
      .set('Authorization', 'Bearer mockedToken');
  
    expect(response.status).toBe(mockStatus);
    expect(response.body).toEqual(mockErrorResponse);
  });

  // Test /generate-question/aleatorio endpoint
  it('debería devolver una pregunta generada aleatoriamente', async () => {
    const mockedQuestion = { question: 'mockedQuestion' };
    axios.get.mockResolvedValueOnce({ data: mockedQuestion });

    const response = await request(app)
      .get('/generate-question/aleatorio')
      .set('Authorization', 'Bearer mockedToken');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockedQuestion);
  });

  it('debería devolver un error 403 si no se proporciona el encabezado de autorización', async () => {
    const response = await request(app).get('/generate-question/aleatorio');

    expect(response.status).toBe(403);
  });

  it('debería devolver un error si el servicio de generación de preguntas falla', async () => {
    const mockedError = { error: 'Error al generar pregunta' };
    axios.get.mockRejectedValueOnce({ response: { status: 500, data: mockedError } });

    const response = await request(app)
      .get('/generate-question/aleatorio')
      .set('Authorization', 'Bearer mockedToken');

    expect(response.status).toBe(500);
    expect(response.body).toEqual(mockedError);
  });

  // Test /generate-question/geografia endpoint
  it('debería devolver una pregunta generada aleatoriamente', async () => {
    const mockedQuestion = { question: 'mockedQuestion' };
    axios.get.mockResolvedValueOnce({ data: mockedQuestion });

    const response = await request(app)
      .get('/generate-question/geografia')
      .set('Authorization', 'Bearer mockedToken');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockedQuestion);
  });

  it('debería devolver un error 403 si no se proporciona el encabezado de autorización', async () => {
    const response = await request(app).get('/generate-question/geografia');

    expect(response.status).toBe(403);
  });

  it('debería devolver un error si el servicio de generación de preguntas falla', async () => {
    const mockedError = { error: 'Error al generar pregunta' };
    axios.get.mockRejectedValueOnce({ response: { status: 500, data: mockedError } });

    const response = await request(app)
      .get('/generate-question/geografia')
      .set('Authorization', 'Bearer mockedToken');

    expect(response.status).toBe(500);
    expect(response.body).toEqual(mockedError);
  });

  // Test /generate-question/deporte endpoint
  it('debería devolver una pregunta generada aleatoriamente', async () => {
    const mockedQuestion = { question: 'mockedQuestion' };
    axios.get.mockResolvedValueOnce({ data: mockedQuestion });

    const response = await request(app)
      .get('/generate-question/deporte')
      .set('Authorization', 'Bearer mockedToken');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockedQuestion);
  });

  it('debería devolver un error 403 si no se proporciona el encabezado de autorización', async () => {
    const response = await request(app).get('/generate-question/deporte');

    expect(response.status).toBe(403);
  });

  it('debería devolver un error si el servicio de generación de preguntas falla', async () => {
    const mockedError = { error: 'Error al generar pregunta' };
    axios.get.mockRejectedValueOnce({ response: { status: 500, data: mockedError } });

    const response = await request(app)
      .get('/generate-question/deporte')
      .set('Authorization', 'Bearer mockedToken');

    expect(response.status).toBe(500);
    expect(response.body).toEqual(mockedError);
  });

// Test /generate-question/politica endpoint
it('debería devolver una pregunta generada aleatoriamente', async () => {
  const mockedQuestion = { question: 'mockedQuestion' };
  axios.get.mockResolvedValueOnce({ data: mockedQuestion });

  const response = await request(app)
    .get('/generate-question/politica')
    .set('Authorization', 'Bearer mockedToken');

  expect(response.status).toBe(200);
  expect(response.body).toEqual(mockedQuestion);
});

it('debería devolver un error 403 si no se proporciona el encabezado de autorización', async () => {
  const response = await request(app).get('/generate-question/politica');

  expect(response.status).toBe(403);
});

it('debería devolver un error si el servicio de generación de preguntas falla', async () => {
  const mockedError = { error: 'Error al generar pregunta' };
  axios.get.mockRejectedValueOnce({ response: { status: 500, data: mockedError } });

  const response = await request(app)
    .get('/generate-question/politica')
    .set('Authorization', 'Bearer mockedToken');

  expect(response.status).toBe(500);
  expect(response.body).toEqual(mockedError);
});

// Test /generate-question/cultura endpoint
it('debería devolver una pregunta generada aleatoriamente', async () => {
  const mockedQuestion = { question: 'mockedQuestion' };
  axios.get.mockResolvedValueOnce({ data: mockedQuestion });

  const response = await request(app)
    .get('/generate-question/cultura')
    .set('Authorization', 'Bearer mockedToken');

  expect(response.status).toBe(200);
  expect(response.body).toEqual(mockedQuestion);
});

it('debería devolver un error 403 si no se proporciona el encabezado de autorización', async () => {
  const response = await request(app).get('/generate-question/cultura');

  expect(response.status).toBe(403);
});

it('debería devolver un error si el servicio de generación de preguntas falla', async () => {
  const mockedError = { error: 'Error al generar pregunta' };
  axios.get.mockRejectedValueOnce({ response: { status: 500, data: mockedError } });

  const response = await request(app)
    .get('/generate-question/cultura')
    .set('Authorization', 'Bearer mockedToken');

  expect(response.status).toBe(500);
  expect(response.body).toEqual(mockedError);
});

// Test /generate-question/descartando endpoint
it('debería devolver una pregunta generada aleatoriamente', async () => {
  const mockedQuestion = { question: 'mockedQuestion' };
  axios.get.mockResolvedValueOnce({ data: mockedQuestion });

  const response = await request(app)
    .get('/generate-question/descartando')
    .set('Authorization', 'Bearer mockedToken');

  expect(response.status).toBe(200);
  expect(response.body).toEqual(mockedQuestion);
});

it('debería devolver un error 403 si no se proporciona el encabezado de autorización', async () => {
  const response = await request(app).get('/generate-question/descartando');

  expect(response.status).toBe(403);
});

it('debería devolver un error si el servicio de generación de preguntas falla', async () => {
  const mockedError = { error: 'Error al generar pregunta' };
  axios.get.mockRejectedValueOnce({ response: { status: 500, data: mockedError } });

  const response = await request(app)
    .get('/generate-question/descartando')
    .set('Authorization', 'Bearer mockedToken');

  expect(response.status).toBe(500);
  expect(response.body).toEqual(mockedError);
});

// Test /generate-question/descubriendociudades endpoint
it('debería devolver una pregunta generada aleatoriamente', async () => {
  const mockedQuestion = { question: 'mockedQuestion' };
  axios.get.mockResolvedValueOnce({ data: mockedQuestion });

  const response = await request(app)
    .get('/generate-question/descubriendociudades')
    .set('Authorization', 'Bearer mockedToken');

  expect(response.status).toBe(200);
  expect(response.body).toEqual(mockedQuestion);
});

it('debería devolver un error 403 si no se proporciona el encabezado de autorización', async () => {
  const response = await request(app).get('/generate-question/descubriendociudades');

  expect(response.status).toBe(403);
});

it('debería devolver un error si el servicio de generación de preguntas falla', async () => {
  const mockedError = { error: 'Error al generar pregunta' };
  axios.get.mockRejectedValueOnce({ response: { status: 500, data: mockedError } });

  const response = await request(app)
    .get('/generate-question/descubriendociudades')
    .set('Authorization', 'Bearer mockedToken');

  expect(response.status).toBe(500);
  expect(response.body).toEqual(mockedError);
});

// Test /generate-question/soloimagenes endpoint
it('debería devolver una pregunta generada aleatoriamente', async () => {
  const mockedQuestion = { question: 'mockedQuestion' };
  axios.get.mockResolvedValueOnce({ data: mockedQuestion });

  const response = await request(app)
    .get('/generate-question/soloimagenes')
    .set('Authorization', 'Bearer mockedToken');

  expect(response.status).toBe(200);
  expect(response.body).toEqual(mockedQuestion);
});

it('debería devolver un error 403 si no se proporciona el encabezado de autorización', async () => {
  const response = await request(app).get('/generate-question/soloimagenes');

  expect(response.status).toBe(403);
});

it('debería devolver un error si el servicio de generación de preguntas falla', async () => {
  const mockedError = { error: 'Error al generar pregunta' };
  axios.get.mockRejectedValueOnce({ response: { status: 500, data: mockedError } });

  const response = await request(app)
    .get('/generate-question/soloimagenes')
    .set('Authorization', 'Bearer mockedToken');

  expect(response.status).toBe(500);
  expect(response.body).toEqual(mockedError);
});

  // Test /questions endpoint
  it('should forward get questions request to question service', async () => {
    const response = await request(app)
      .get('/questions');

    expect(response.statusCode).toBe(200);
    expect(response.body.question).toBe('mockedQuestion');
  });

  it('debería manejar errores al intentar obtener preguntas', async () => {
    const mockErrorResponse = { error: 'Error al obtener preguntas' };
    const mockStatus = 500;
  
    axios.get.mockRejectedValueOnce({ response: { status: mockStatus, data: mockErrorResponse } });
  
    const response = await request(app).get('/questions');
  
    expect(response.status).toBe(mockStatus);
    expect(response.body).toEqual(mockErrorResponse);
  });

   // Test /statistics endpoint
   it('should forward get statistics request to statistics service', async () => {
    const response = await request(app)
      .get('/statistics');

    expect(response.statusCode).toBe(200);
    expect(response.body.gamesPlayed).toBe('mockedGamesPlayed');
    expect(response.body.rigthAnswers).toBe('mockedRigthAnswers');
    expect(response.body.wrongAnswers).toBe('mockedWrongAnswers');
  });

  it('debería manejar errores al intentar obtener estadísticas', async () => {
    const mockErrorResponse = { error: 'Error al obtener estadísticas' };
    const mockStatus = 500;
  
    axios.get.mockRejectedValueOnce({ response: { status: mockStatus, data: mockErrorResponse } });
  
    const response = await request(app).get('/statistics');
  
    expect(response.status).toBe(mockStatus);
    expect(response.body).toEqual(mockErrorResponse);
  });

  // Test /addStatistic endpoint
  it('should forward add statistic request to statistic service', async () => {
    const response = await request(app)
      .post('/addStatistic')
      .send({ userId: 'testuser', gamesPlayed: 10, rightAnswers: 5, wrongAnswers: 5 });

    expect(response.statusCode).toBe(200);
    expect(response.body.statisticId).toBe('mockedStatisticId');
  });

  it('debería manejar errores al intentar agregar una estadística', async () => {
    const mockErrorResponse = { error: 'Error al agregar estadística' };
    const mockStatus = 500;
  
    axios.post.mockRejectedValueOnce({ response: { status: mockStatus, data: mockErrorResponse } });
  
    const response = await request(app)
      .post('/addStatistic')
      .send({ userId: 'testuser', gamesPlayed: 10, rightAnswers: 5, wrongAnswers: 5 });
  
    expect(response.status).toBe(mockStatus);
    expect(response.body).toEqual(mockErrorResponse);
  });

  // Test /users endpoint
  it('should forward get users request to user service', async () => {
    const response = await request(app)
      .get('/users');

    expect(response.statusCode).toBe(200);
    expect(response.body.users).toEqual(['mockedUser1', 'mockedUser2']);
  });

  it('debería manejar errores al intentar obtener usuarios', async () => {
    const mockErrorResponse = { error: 'Error al obtener usuarios' };
    const mockStatus = 500;
  
    axios.get.mockRejectedValueOnce({ response: { status: mockStatus, data: mockErrorResponse } });
  
    const response = await request(app).get('/users');
  
    expect(response.status).toBe(mockStatus);
    expect(response.body).toEqual(mockErrorResponse);
  });

  // Test /ranking/accuracy endpoint
  it('should forward get ranking/accuracy request to statistics service', async () => {
    const response = await request(app)
      .get('/ranking/accuracy');

    expect(response.statusCode).toBe(200);
    expect(response.body.user).toBe('mockedUser');
    expect(response.body.accuracy).toBe('mockedAccuracy');
    
  });

  it('debería manejar errores al intentar obtener ranking con métrica Porcentaje de Aciertos', async () => {
    const mockErrorResponse = { error: 'Error al obtener ranking' };
    const mockStatus = 500;
  
    axios.get.mockRejectedValueOnce({ response: { status: mockStatus, data: mockErrorResponse } });
  
    const response = await request(app).get('/ranking/accuracy');
  
    expect(response.status).toBe(mockStatus);
    expect(response.body).toEqual(mockErrorResponse);
  });

   // Test /ranking/correctAnswers endpoint
   it('should forward get ranking/correctAnswers request to statistics service', async () => {
    const response = await request(app)
      .get('/ranking/correctAnswers');

    expect(response.statusCode).toBe(200);
    expect(response.body.user).toBe('mockedUser');
    expect(response.body.accuracy).toBe('mockedCorrectAnswers');
    
  });

  it('debería manejar errores al intentar obtener ranking con métrica Respuestas Correctas', async () => {
    const mockErrorResponse = { error: 'Error al obtener ranking' };
    const mockStatus = 500;
  
    axios.get.mockRejectedValueOnce({ response: { status: mockStatus, data: mockErrorResponse } });
  
    const response = await request(app).get('/ranking/correctAnswers');
  
    expect(response.status).toBe(mockStatus);
    expect(response.body).toEqual(mockErrorResponse);
  });

  // Test /ranking/gamesPlayed endpoint
  it('should forward get ranking/gamesPlayed request to statistics service', async () => {
    const response = await request(app)
      .get('/ranking/gamesPlayed');

    expect(response.statusCode).toBe(200);
    expect(response.body.user).toBe('mockedUser');
    expect(response.body.accuracy).toBe('mockedGamesPlayed');
    
  });

  it('debería manejar errores al intentar obtener ranking con métrica Partidas Jugadas', async () => {
    const mockErrorResponse = { error: 'Error al obtener ranking' };
    const mockStatus = 500;
  
    axios.get.mockRejectedValueOnce({ response: { status: mockStatus, data: mockErrorResponse } });
  
    const response = await request(app).get('/ranking/gamesPlayed');
  
    expect(response.status).toBe(mockStatus);
    expect(response.body).toEqual(mockErrorResponse);
  });

});
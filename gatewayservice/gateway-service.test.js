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
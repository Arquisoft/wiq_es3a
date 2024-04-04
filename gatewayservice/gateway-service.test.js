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
      return Promise.resolve({ data: { token: 'mockedToken' } });
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
    }
  });

 

  // Test /login endpoint
  it('should forward login request to auth service', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBe('mockedToken');
  });

  // Test /adduser endpoint
  it('should forward add user request to user service', async () => {
    const response = await request(app)
      .post('/adduser')
      .send({ username: 'newuser', password: 'newpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body.userId).toBe('mockedUserId');
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
  // Test /questions endpoint
  it('should forward get questions request to question service', async () => {
    const response = await request(app)
      .get('/questions');

    expect(response.statusCode).toBe(200);
    expect(response.body.question).toBe('mockedQuestion');
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

  // Test /addStatistic endpoint
  it('should forward add statistic request to statistic service', async () => {
    const response = await request(app)
      .post('/addStatistic')
      .send({ userId: 'testuser', gamesPlayed: 10, rightAnswers: 5, wrongAnswers: 5 });

    expect(response.statusCode).toBe(200);
    expect(response.body.statisticId).toBe('mockedStatisticId');
  });

  // Test /users endpoint
  it('should forward get users request to user service', async () => {
    const response = await request(app)
      .get('/users');

    expect(response.statusCode).toBe(200);
    expect(response.body.users).toEqual(['mockedUser1', 'mockedUser2']);
  });

});
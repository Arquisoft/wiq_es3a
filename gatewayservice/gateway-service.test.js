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
    } 
  });
  axios.get.mockImplementation((url) => {
    if (url.endsWith('/generate-question')) {
      return Promise.resolve({ data: { question: 'mockedQuestion' } });
    }else if (url.endsWith('/questions')) {
      return Promise.resolve({ data: { question: 'mockedQuestion' } });
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
      .get('/generate-question');

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
});
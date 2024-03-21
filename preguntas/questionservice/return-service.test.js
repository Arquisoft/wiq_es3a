const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');

const Question = require('./question-model');

let app;
let mongoServer;
const Questions = [
  {
    question: '¿Cuál es la capital de España?',
    correctAnswer: 'Madrid',
    allAnswers: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia']
  },
  {
    question: '¿Cuál es la capital de Francia?',
    correctAnswer: 'París',
    allAnswers: ['París', 'Lyon', 'Marsella', 'Niza']
  }
];

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  app = require('./return-service');

  await Question.insertMany(Questions);
});

afterAll(async () => {
  app.close();
  await mongoServer.stop();
});

describe('Return Service', () => {
  it('should return all questions', async () => {
    const response = await request(app).get('/questions');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });
});
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Stat = require('./user-model');

let mongoServer;
let app;

const stat = {
    username: 'testuser',
    rigthAnswers: 5,
    wrongAnswers: 2,
    time: 300,
  };

async function addStatistic(stat){
    const newstat = new Stat({
        username: 'testuser',
        password:"test",
        rigthAnswers: 5,
        wrongAnswers: 2,
        time: 300,
    })
  
    await newstat.save();
}

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    process.env.MONGODB_URI = mongoUri;
    app = require('./statistics-service'); 
    await addStatistic(stat);
})
 
afterAll(async () => {
    app.close();
    await mongoServer.stop();
});

describe('Statistics Service', () => {

  describe('POST /addStatistic', () => {
    it('should add statistics for a user', async () => {
        const stat = {
            username: 'testuser',
            rigthAnswers: 5,
            wrongAnswers: 2,
            time: 300,
          };
      const res = await request(app)
        .post('/addStatistic')
        .send(stat);
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('username', 'testuser');
      expect(res.body).toHaveProperty('gamesPlayed', 1);
      expect(res.body).toHaveProperty('rigthAnswers', 10);
      expect(res.body).toHaveProperty('wrongAnswers', 4);
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/addStatistic')
        .send({
          // Missing required fields
        });

      expect(res.statusCode).toEqual(400);
    });
  });

  describe('GET /statistics', () => {
    it('should get statistics for a user', async () => {
      const res = await request(app)
        .get('/statistics')
        .query({ userId: 'testuser' });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('username', 'testuser');
      expect(res.body).toHaveProperty('gamesPlayed', 1);
      expect(res.body).toHaveProperty('rigthAnswers', 10);
      expect(res.body).toHaveProperty('wrongAnswers', 4);
    });

    it('should return 500 if user statistics are not found', async () => {
      const res = await request(app)
        .get('/statistics')
        .query({ userId: 'nonexistentuser' });

      expect(res.statusCode).toEqual(500);
    });
  });
});

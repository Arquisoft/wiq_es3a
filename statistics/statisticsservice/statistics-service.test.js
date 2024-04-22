const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Stat = require('./user-model');
const axios = require('axios')

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

    await Stat.create([
      { username: 'user1', password:"test", rigthAnswers: 8, gamesPlayed: 10 }, 
      { username: 'user2', password:"test", rigthAnswers: 15, gamesPlayed: 20 }, 
    ]);

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

describe('GET /ranking/accuracy', () => {
  it('should return ranked users based on accuracy', async () => {
    

    // Realizar una solicitud GET al endpoint /ranking/accuracy
    const response = await request(app).get('/ranking/accuracy');

    // Verificar el código de estado de la respuesta
    expect(response.status).toBe(200);

    // Verificar el cuerpo de la respuesta para testuser
    expect(response.body[0]).toHaveProperty('username', 'testuser');
    expect(response.body[0]).toHaveProperty('accuracy', 100); 

    // Verificar el cuerpo de la respuesta para user1
    expect(response.body[1]).toHaveProperty('username', 'user1');
    expect(response.body[1]).toHaveProperty('accuracy', 8);

    // Verificar el cuerpo de la respuesta para user2
    expect(response.body[2]).toHaveProperty('username', 'user2');
    expect(response.body[2]).toHaveProperty('accuracy', '7.50'); 
  });


  it('should return ranked users based on correct answers', async () => {

    // Realizar una solicitud GET al endpoint /ranking/correctAnswers
    const response = await request(app).get('/ranking/correctAnswers');

    // Verificar el código de estado de la respuesta
    expect(response.status).toBe(200);

    // Verificar el cuerpo de la respuesta para user2
    expect(response.body[0]).toHaveProperty('username', 'user2');
    expect(response.body[0]).toHaveProperty('correctAnswers', 15); 

    // Verificar el cuerpo de la respuesta para testuser
    expect(response.body[1]).toHaveProperty('username', 'testuser');
    expect(response.body[1]).toHaveProperty('correctAnswers', 10);

    // Verificar el cuerpo de la respuesta para user1
    expect(response.body[2]).toHaveProperty('username', 'user1');
    expect(response.body[2]).toHaveProperty('correctAnswers', 8);
  });
  

  it('should return ranked users based on games played', async () => {

    // Realizar una solicitud GET al endpoint /ranking/gamesPlayed
    const response = await request(app).get('/ranking/gamesPlayed');

    // Verificar el código de estado de la respuesta
    expect(response.status).toBe(200);

    // Verificar el cuerpo de la respuesta para user2
    expect(response.body[0]).toHaveProperty('username', 'user2');
    expect(response.body[0]).toHaveProperty('gamesPlayed', 20); 

    // Verificar el cuerpo de la respuesta para testuser
    expect(response.body[2]).toHaveProperty('username', 'testuser');
    expect(response.body[2]).toHaveProperty('gamesPlayed', 1);

    // Verificar el cuerpo de la respuesta para user1
    expect(response.body[1]).toHaveProperty('username', 'user1');
    expect(response.body[1]).toHaveProperty('gamesPlayed', 10);
  });
});
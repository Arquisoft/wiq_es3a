const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const formatoNumero = require('./question-service').formatoNumero;

const Template = require('./template-model');

let app;
let mongoServer;
const template = {         
    question: "¿Cuál es la capital de ^ ?",
    query: "SELECT ?pLabel ?rLabel WHERE { ?p wdt:P31 wd:Q6256. ?p wdt:P36 ?r. SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],es\". } }",

}

beforeAll(async () => {
mongoServer = await MongoMemoryServer.create();
const mongoUri = mongoServer.getUri();
process.env.MONGODB_URI = mongoUri;
app = require('./question-service');

await addTemplate(template);
});

//Function to add template
async function addTemplate(template){
const newTemplate = new Template({  
    question: template.question,
    query: template.query,
});

await newTemplate.save();
}

afterAll(async () => {
app.close();
await mongoServer.stop();
});

describe('Question Service', () => {
        it('should generate and store a question', async () => {
            const response = await request(app).get('/generate-question');
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('question');
            expect(response.body).toHaveProperty('correctAnswer');
            expect(response.body).toHaveProperty('allAnswers');
            expect(response.body.allAnswers).toHaveLength(4);
        });
}, 10000);

describe('formatoNumero', () => {
  it('debería formatear correctamente los números', async () => {
    const numero = 1234567.89;
    const resultado = await formatoNumero(numero);
    expect(resultado).toBe('1.234.567,89');
  });
});
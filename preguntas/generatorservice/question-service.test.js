const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');


const Template = require('./template-model');

let app;
let mongoServer;
const templates = [{         
    question: "¿Cuál es la capital de ^?",
    query: "SELECT ?pLabel ?rLabel WHERE { ?p wdt:P31 wd:Q6256. ?p wdt:P36 ?r. FILTER(?p != wd:Q124653007) SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],es\". } }",
    category: "geografia"
  },
  {
    question: "¿En que año se fundó el equipo de fútbol ^?",
    query: "SELECT ?pLabel (YEAR(?r) AS ?rLabel) WHERE { ?p wdt:P31/wdt:P279* wd:Q476028; wdt:P17 wd:Q29; wdt:P118 ?tipoEquipo. VALUES ?tipoEquipo { wd:Q35615 wd:Q324867 } OPTIONAL { ?p wdt:P571 ?r } SERVICE wikibase:label { bd:serviceParam wikibase:language '[AUTO_LANGUAGE],es'. }} GROUP BY ?pLabel ?r",
    category: "deporte"
  },
  {
    question: "¿Qúe moneda es utilizada en ^?",
    query: "SELECT ?pLabel ?rLabel WHERE { ?p wdt:P31 wd:Q6256. ?p wdt:P38 ?r. FILTER(?r NOT IN (wd:Q100928009, wd:Q329248, wd:Q4228784, wd:Q96051466)) SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],es\". } }",
    category: "politica"
  },
  {
    question: "¿Quién es el autor de la novela ^?",
    query: "SELECT ?pLabel ?rLabel WHERE { VALUES ?p { wd:Q480 wd:Q174596 wd:Q178869 wd:Q208460 wd:Q15228 wd:Q25338 wd:Q8337 wd:Q52910 wd:Q1784466 wd:Q214132} ?p wdt:P50 ?r. SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],es\". }}",
    category: "cultura"
  }
];

beforeAll(async () => {
mongoServer = await MongoMemoryServer.create();
const mongoUri = mongoServer.getUri();
process.env.MONGODB_URI = mongoUri;
app = require('./question-service');
formatoNumero = require('./question-service').formatoNumero;

await addTemplate(templates);
}, 10000);

//Function to add template
async function addTemplate(templates){
  for (const template of templates) {
    const newTemplate = new Template({  
      question: template.question,
      query: template.query,
      category: template.category
  });
  
  await newTemplate.save();
  }
}

afterAll(async () => {
app.close();
await mongoServer.stop();
});

describe('formatoNumero', () => {
  it('debería formatear correctamente los números', async () => {
    const numero = 1234567.89;
    const resultado = await formatoNumero(numero);
    expect(resultado).toBe('1.234.567,89');
  });
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

describe('Question Service aleatorio', () => {
  it('should generate and store a question', async () => {
      const response = await request(app).get('/generate-question/aleatorio');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('question');
      expect(response.body).toHaveProperty('correctAnswer');
      expect(response.body).toHaveProperty('allAnswers');
      expect(response.body.allAnswers).toHaveLength(4);
  });
}, 10000);

describe('Question Service geografia', () => {
  it('should generate and store a question', async () => {
      const response = await request(app).get('/generate-question/geografia');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('question');
      expect(response.body).toHaveProperty('correctAnswer');
      expect(response.body).toHaveProperty('allAnswers');
      expect(response.body.allAnswers).toHaveLength(4);
  });
}, 10000);

describe('Question Service deporte', () => {
  it('should generate and store a question', async () => {
      const response = await request(app).get('/generate-question/deporte');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('question');
      expect(response.body).toHaveProperty('correctAnswer');
      expect(response.body).toHaveProperty('allAnswers');
      expect(response.body.allAnswers).toHaveLength(4);
  });
}, 10000);

describe('Question Service politica', () => {
  it('should generate and store a question', async () => {
      const response = await request(app).get('/generate-question/politica');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('question');
      expect(response.body).toHaveProperty('correctAnswer');
      expect(response.body).toHaveProperty('allAnswers');
      expect(response.body.allAnswers).toHaveLength(4);
  });
}, 10000);

describe('Question Service cultura', () => {
  it('should generate and store a question', async () => {
      const response = await request(app).get('/generate-question/cultura');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('question');
      expect(response.body).toHaveProperty('correctAnswer');
      expect(response.body).toHaveProperty('allAnswers');
      expect(response.body.allAnswers).toHaveLength(4);
  });
}, 10000);

describe('Question Service descartando', () => {
  it('should generate and store a question', async () => {
      const response = await request(app).get('/generate-question/descartando');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('question');
      expect(response.body).toHaveProperty('correctAnswer');
      expect(response.body).toHaveProperty('allAnswers');
      expect(response.body.allAnswers).toHaveLength(4);
  });
}, 10000);

describe('Question Service descubriendo', () => {
  it('should generate and store a question', async () => {
      const response = await request(app).get('/generate-question/descubriendociudades');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('question');
      expect(response.body).toHaveProperty('correctAnswer');
      expect(response.body).toHaveProperty('allAnswers');
      expect(response.body.allAnswers).toHaveLength(4);
  });
}, 10000);

describe('Question Service solo imagenes', () => {
  it('should generate and store a question', async () => {
      const response = await request(app).get('/generate-question/soloimagenes');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('question');
      expect(response.body).toHaveProperty('correctAnswer');
      expect(response.body).toHaveProperty('allAnswers');
      expect(response.body.allAnswers).toHaveLength(4);
  });
}, 10000);


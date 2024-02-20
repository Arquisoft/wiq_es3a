/**
 * Clase utilizada para generar una pregunta aleatoria de todas las que hay en data.js
 * 
 * -Devuelve la pregunta en lenguaje natural
 * -Devuelve la consulta SPARQL que se hará a la API Wikidata 
 */

class PreguntaGenerator {
    constructor(data) {
        this.json = data;
        this.generate(this.json);

        this.pregunta;
        this.query;
    }

    // data es un JSON con las preguntas
    generate(data) {
        const categorias = Object.keys(data);
        const categoriaAleatoria = categorias[Math.floor(Math.random() * categorias.length)];

        const preguntas = data[categoriaAleatoria].preguntas;
        const preguntaAleatoria = preguntas[Math.floor(Math.random() * preguntas.length)];

        this.pregunta = preguntaAleatoria.pregunta;
        this.query = preguntaAleatoria.query;
    }

    getPregunta(){
        return this.pregunta;
    }

    getQuery(){
        return this.query;
    }
    
}

//Hace falta leer el fichero data.JSON para poder utilizar la clase PreguntaGenerator
//Se utiliza require??? fetch??? 
const json = null;
const preguntaGen = new PreguntaGenerator(json);

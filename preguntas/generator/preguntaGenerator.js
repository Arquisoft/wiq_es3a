class PreguntaGenerator {
    constructor() {
        //Todavia por definir
        this.json = null;

        this. pregunta = this.generate(this.json);
    }

    // data es un JSON con las preguntas
    generate(data) {
        const categorias = Object.keys(data);
        const categoriaAleatoria = categorias[Math.floor(Math.random() * categorias.length)];

        const preguntas = data[categoriaAleatoria].preguntas;
        const preguntaAleatoria = preguntas[Math.floor(Math.random() * preguntas.length)];

        return preguntaAleatoria.pregunta;
    }
    
}

const preguntaGen = new PreguntaGenerator();

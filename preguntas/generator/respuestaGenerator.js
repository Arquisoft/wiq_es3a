/**
 * Clase utilizada para generar una pregunta aleatoria de todas las que hay en data.js
 * 
 * -Devuelve la entidad pregunta
 * -Devuelve la respuesta corecta a la pregunta
 */

const axios = require('axios');

class RespuestaGenerator {
    constructor(query) {
        this.query = query;
    }

    async ejecutarConsulta(endpointUrl) {
        try {
            const settings = {
                headers: { Accept: 'application/sparql-results+json' },
                params: { query: this.query }
            };
            const { data } = await axios.get(endpointUrl, settings);
            const formattedResults = data.results.bindings.map(function(binding) {
                return {
                    pLabel: binding.pLabel.value,
                    rLabel: binding.rLabel.value
                };
            });
            return formattedResults;
        } catch (error) {
            console.error("Error al ejecutar la consulta SPARQL:", error);
            return null;
        }
    }
}

// Ejemplo de uso
const endpointUrl = 'https://query.wikidata.org/sparql';
const sparqlQuery = "SELECT ?paisLabel ?capitalLabel\n" +
    "WHERE {\n" +
    "  ?pais wdt:P31 wd:Q6256. # Seleccionar instancias de país\n" +
    "  ?pais wdt:P36 ?capital.  # Obtener la capital del país\n" +
    "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],es\". }\n" +
    "}\n";

const respuestaGen = new RespuestaGenerator(sparqlQuery);
respuestaGen.ejecutarConsulta(endpointUrl)
    .then(respuesta => {
        console.log("Respuesta:", respuesta);
        console.log("Número de resultados:", respuesta.length);
    })
    .catch(error => {
        console.error("Error:", error);
    });

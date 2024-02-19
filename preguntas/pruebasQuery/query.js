const endpointUrl = 'https://query.wikidata.org/sparql';
const sparqlQuery = "SELECT ?paisLabel ?capitalLabel\n" +
    "WHERE {\n" +
    "  ?pais wdt:P31 wd:Q6256. # Seleccionar instancias de país\n" +
    "  ?pais wdt:P36 ?capital.  # Obtener la capital del país\n" +
    "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],es\". }\n" +
    "}\n";

function capitalPais(endpointUrl, sparqlQuery) {
    var settings = {
        headers: { Accept: 'application/sparql-results+json' },
        data: { query: sparqlQuery }
    };
    return $.ajax(endpointUrl, settings).then(function(data) {
        var formattedResults = data.results.bindings.map(function(binding) {
            return {
                paisLabel: binding.paisLabel.value,
                capitalLabel: binding.capitalLabel.value
            };
        });
        return formattedResults;
    });
}

function setUp() {
    capitalPais(endpointUrl, sparqlQuery).then(function(data) {
        JSON = data;
        console.log(JSON);
    });
}


import React, { useState, useEffect } from 'react';

const Ranking = () => {
    const gatewayEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
    const [rankingData, setRankingData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedMetric, setSelectedMetric] = useState('accuracy');
    const [headerText, setHeaderText] = useState('Porcentaje de Acierto');

    useEffect(() => {
        fetch(`${gatewayEndpoint}/ranking/${selectedMetric}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ha ocurrido un error al obtener el ranking');
                }
                return response.json();
            })
            .then(data => {
                setRankingData(data);
            })
            .catch(error => {
                setError(error.message);
            });

        // Cambiar el texto de la cabecera de la tabla según la métrica seleccionada
        if (selectedMetric === 'accuracy') {
            setHeaderText('Porcentaje de Acierto');
        } else if (selectedMetric === 'ccorrectAnswers') {
            setHeaderText('Respuestas Correctas');
        } else if (selectedMetric === 'games-played') {
            setHeaderText('Partidas Jugadas');
        }
    }, [gatewayEndpoint, selectedMetric]);

    return (
        <div>
            <h1>Ranking</h1>
            <div>
                <label htmlFor="metric-select">Seleccionar métrica:</label>
                <select id="metric-select" value={selectedMetric} onChange={e => setSelectedMetric(e.target.value)}>
                    <option value="accuracy">Porcentaje de Acierto</option>
                    <option value="correctAnswers">Respuestas Correctas</option>
                    <option value="games-played">Partidas Jugadas</option>
                </select>
            </div>
            {error ? (
                <p>Error: {error}</p>
            ) : rankingData ? (
                <table>
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>{headerText}</th> {/* Usamos el estado headerText para mostrar el texto de la cabecera */}
                        </tr>
                    </thead>
                    <tbody>
                        {rankingData.map((user, index) => (
                            <tr key={index}>
                                <td>{user.username}</td>
                                <td>{user[selectedMetric]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Cargando ranking...</p>
            )}
        </div>
    );
}
export default Ranking;
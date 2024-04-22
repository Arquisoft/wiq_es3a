import React, { useState, useEffect } from 'react';
import './Ranking.css';
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" />



const Ranking = () => {
    const gatewayEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
    const [rankingData, setRankingData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedMetric, setSelectedMetric] = useState('accuracy');
    const [headerText, setHeaderText] = useState('Porcentaje de Acierto');

    // Actualizar el texto de la cabecera de la tabla cuando cambie la métrica seleccionada
    useEffect(() => {
        if (selectedMetric === 'accuracy') {
            setHeaderText('Porcentaje de Acierto (%)');
        } else if (selectedMetric === 'correctAnswers') {
            setHeaderText('Respuestas Correctas');
        } else if (selectedMetric === 'gamesPlayed') {
            setHeaderText('Partidas Jugadas');
        }
    }, [selectedMetric]);

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
    }, [gatewayEndpoint, selectedMetric]);

    return (
        <div className="container">
        <div className="title">
        <img src="/ranking.png" alt="Título como imagen" className="title-image" />
        </div>
        
        <div className="centered-content">
            <label htmlFor="metric-select" className="label-large">Seleccionar métrica:</label>
            <select id="metric-select" value={selectedMetric} onChange={e => setSelectedMetric(e.target.value)} className="select-large">
                <option value="accuracy">Porcentaje de Acierto</option>
                <option value="correctAnswers">Respuestas Correctas</option>
                <option value="gamesPlayed">Partidas Jugadas</option>
            </select>
        </div>
            {error ? (
                <p>Error: {error}</p>
            ) : rankingData ? (
                <div className='table'> 
                <table>
                    <thead>
                        <tr>
                            <th>Posición</th>
                            <th>Usuario</th>
                            <th>{headerText}</th> {/* Usamos el estado headerText para mostrar el texto de la cabecera */}
                        </tr>
                    </thead>
                    <tbody>
                        {rankingData.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td> {/* Posición del usuario */}
                                <td>{user.username}</td>
                                <td>{user[selectedMetric]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div> 
            ) : (
                <p>Cargando ranking...</p>
            )}
           </div>
           
       
    );
}

export default Ranking;
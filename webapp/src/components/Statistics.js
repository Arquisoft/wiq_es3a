import React, { useState, useEffect } from 'react';
import './Statistics.css';

const Statistics= () => {
  const gatewayEndpoint = process.env.GATEWAY_SERVICE_URL || 'http://localhost:8000';
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const userId = localStorage.getItem('username');
    // Realizar una solicitud al servidor para obtener las estadísticas del usuario
    fetch(`${gatewayEndpoint}/statistics?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        setUserData(data);
      })
      .catch(error => {
        setError('Ha habido un error cargando las estadísticas');
      });
  }, []);


  return (
    <div>
      <h1>Estadísticas</h1>
      {error ? ( // Verificar si hay un error
      <p>Error: {error}</p>
    ) : userData ? (
        <table>
          <thead>
            <tr>
              <th>Partidas Jugadas</th>
              <th>Preguntas Acertadas</th>
              <th>Preguntas Falladas</th>
              <th>Tiempo Medio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{userData.gamesPlayed}</td>
              <td>{userData.rigthAnswers}</td>
              <td>{userData.wrongAnswers}</td>
              <td>{userData.avgTime}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Cargando estadísticas...</p>
      )}
    </div>
  );
}

export default Statistics;

import React, { useState, useEffect } from 'react';
import './Statistics.css';


const Statistics= () => {
  const gatewayEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
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
  }, [gatewayEndpoint]);


  return (
    <div className='principal'>
      <div className="title">
        <img src="/estadisticas.png" alt="Título como imagen" className="title-image" />
        </div>
    
      {error ? ( // Verificar si hay un error
      <p>Error: {error}</p>
    ) : userData ? (
      <div className='table-stats'> 
        <table>
          <thead>
            <tr>
              <th>Partidas Jugadas</th>
              <th>Preguntas Acertadas</th>
              <th>Preguntas Falladas</th>
              <th>Tiempo Medio (s)</th>
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
        </div>
      ) : (
        <p>Cargando estadísticas...</p>
      )}
      
    </div>
    
    
  );
 
}

export default Statistics;
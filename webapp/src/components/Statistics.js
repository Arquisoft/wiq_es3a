import React, { useState, useEffect } from 'react';
import './Statistics.css';

function Statistics(){
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Obtener el userId del localStorage o de cualquier otro lugar donde lo almacenes
    const userId = localStorage.getItem('username');

    // Realizar una solicitud al servidor para obtener las estadísticas del usuario
    fetch(`/getStatistics/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener las estadísticas del usuario.');
        }
        return response.json();
      })
      .then(data => {
        setUserData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      <h1>Estadísticas</h1>
      {userData ? (
        <table>
          <thead>
            <tr>
              <th>Partidas Jugadas</th>
              <th>Preguntas Acertadas</th>
              <th>Preguntas Falladas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{userData.gamesPlayed}</td>
              <td>{userData.correctAnswers}</td>
              <td>{userData.incorrectAnswers}</td>
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

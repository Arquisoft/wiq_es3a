import React, { useState, useEffect } from 'react';

const totalTime = parseInt(localStorage.getItem("tiempoJuego"));

const Timer = ({ initialTime = totalTime, onTimeOver, onTimeChange }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          if (onTimeOver) {
            onTimeOver();
          }
          return prevTime;
        }
        const newTime = prevTime - 1;
        if (onTimeChange) {
          onTimeChange(newTime);
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeOver, onTimeChange]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div id='timerContainer'>
      <h3>Tiempo restante: {formatTime(time)}</h3>
    </div>
  );
};

export default Timer;


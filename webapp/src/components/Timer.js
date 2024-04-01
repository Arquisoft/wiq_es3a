import React, { useState, useEffect } from 'react';

const totalTime = 180;

const Timer = ({ initialTime = totalTime, onTimeOver }) => {
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
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeOver]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div>
      Tiempo restante: {formatTime(time)}
    </div>
  );
};

export default Timer;


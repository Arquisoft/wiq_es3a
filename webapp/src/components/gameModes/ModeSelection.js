import React, {useState} from 'react';
import './ModeSelection.css';
import Categories from '../categories/categories';

const ModeSelection = () => {
  const modoInicial = '';

  const [modoSeleccionado, setModoSeleccionado] = useState(modoInicial);
  const [isModeSelected, setIsModeSelected] = useState(false);

  const modos = ['Batería de sabios', 'Descartando', 'Descubriendo ciudades', 'Solo imágenes'];

  const seleccionarModo = (modo) => {
    setModoSeleccionado(quitarEspacios(modo.toLowerCase()));
    localStorage.setItem('mode', quitarEspacios(modo.toLowerCase()));
  };

  function quitarEspacios(cadena) {
    return cadena.replace(/\s+/g, '');
  }

  return (
    <div>
      { isModeSelected && modoSeleccionado==="bateríadesabios"? (
        <Categories />
        ) : (
          <div className="modos-container">
          <h2>Selecciona un modo de juego:</h2>
          <div className="modos-list">
            {modos.map((modo, index) => (
              <button
                key={index}
                className={`modo-button ${quitarEspacios(modo.toLowerCase()) === modoSeleccionado ? 'selected' : ''}`}
                onClick={() => {seleccionarModo(modo); setIsModeSelected(true)}}
              >
                {modo}
              </button>
            ))}
          </div>
        </div>
        )
      }
    </div>
    
  );
};

export default ModeSelection;


import React, { useState } from 'react';
import './categories.css';

function Categorias() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const categorias = [
    'Todas',
    'Geografía',
    'Deporte',
    'Política y economía',
    'Escudos y banderas',
    'Cultura'
  ];

  const seleccionarCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  return (
    <div className="categorias-container">
      <h2>Selecciona una categoría:</h2>
      <div className="categorias-list">
        {categorias.map((categoria, index) => (
          <button
            key={index}
            className={`categoria-button ${categoria === categoriaSeleccionada ? 'selected' : ''}`}
            onClick={() => seleccionarCategoria(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Categorias;

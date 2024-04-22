import React, { useState } from 'react';
import './categories.css';

function Categorias() {
  const categoriaGuardada = localStorage.getItem("categoria");
  const categoriaInicial = categoriaGuardada ? categoriaGuardada.toLowerCase() : "aleatorio";

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categoriaInicial);

  const categorias = [
    'Aleatorio',
    'Geografia',
    'Deporte',
    'Politica',
    'Cultura'
  ];

  const seleccionarCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria.toLowerCase());
    localStorage.setItem("categoria", categoria.toLowerCase());
  };

  return (
    <div className="categorias-container">
      <h2>Selecciona categoría de sabio:</h2>
      <div className="categorias-list">
        {categorias.map((categoria, index) => (
          <button
            key={index}
            className={`categoria-button ${categoria.toLowerCase() === categoriaSeleccionada ? 'selected' : ''}`}
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


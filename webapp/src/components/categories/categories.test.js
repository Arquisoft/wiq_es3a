import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Categorias from './categories';

describe('Categorias', () => {
  // Limpiar todos los elementos de localStorage antes de cada prueba
  beforeEach(() => {
    localStorage.clear();
  });

  it('debería renderizar todas las categorías', () => {
    render(<Categorias />);
    const categorias = ['Aleatorio', 'Geografia', 'Deporte', 'Politica', 'Cultura'];

    categorias.forEach(categoria => {
      expect(screen.getByText(categoria)).toBeInTheDocument();
    });
  });

  it('debería seleccionar una categoría al hacer clic en ella', () => {
    render(<Categorias />);
    const button = screen.getByText('Deporte');

    fireEvent.click(button);

    expect(button.className).toContain('selected');
    expect(localStorage.getItem('categoria')).toBe('deporte');
  });

  it('debería seleccionar la categoría guardada en localStorage al renderizar', () => {
    localStorage.setItem('categoria', 'politica');
    render(<Categorias />);
    const button = screen.getByText('Politica');

    expect(button.className).toContain('selected');
  });
});
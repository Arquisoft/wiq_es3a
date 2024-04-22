import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import ModeSelection from './ModeSelection';

jest.mock('../categories/categories', () => () => <div>Categorias</div>);

describe('ModeSelection', () => {
  // Limpiar todos los elementos de localStorage antes de cada prueba
  beforeEach(() => {
    localStorage.clear();
  });

  it('debería renderizar todos los modos', () => {
    render(<ModeSelection />);
    const modos = ['Batería de sabios', 'Descartando', 'Descubriendo ciudades', 'Solo imagenes'];

    modos.forEach(modo => {
      expect(screen.getByText(modo)).toBeInTheDocument();
    });
  });

  it('debería seleccionar un modo al hacer clic en él', async () => {
    render(<ModeSelection />);
    const button = screen.getByText('Descartando');
  
    fireEvent.click(button);
  
    await waitFor(() => expect(button.className).toContain('selected'));
  
    expect(localStorage.getItem('mode')).toBe('descartando');
  });

  it('debería mostrar el componente Categorias cuando se selecciona el modo "Batería de sabios"', () => {
    render(<ModeSelection />);
    const button = screen.getByText('Batería de sabios');

    fireEvent.click(button);

    expect(screen.getByText('Categorias')).toBeInTheDocument();
  });
});
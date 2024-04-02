import React from 'react';
import { render, screen } from '@testing-library/react';
import Statistics from './Statistics';

describe('Statistics component', () => {
  beforeEach(() => {
    // Limpiamos el localStorage antes de cada prueba
    localStorage.clear();
  });

  test('user statistics', async () => {
    render(<Statistics />);
    let statisticWordArray=screen.getAllByText(/Estadísticas/i)
    for(let i=0;i<2;i++){
      expect(statisticWordArray[i]).toBeInTheDocument();
    }
  });


  it('fetches user statistics and displays them', async () => {
    const userData = {
      gamesPlayed: 10,
      rigthAnswers: 7,
      wrongAnswers: 3
    };

    // Simulamos el usuario almacenado en localStorage
    const userId = 'testUser';
    localStorage.setItem('username', userId);

    // Mock de la respuesta de la API
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(userData),
    };
    jest.spyOn(global, 'fetch').mockResolvedValueOnce(mockResponse);

    // Renderizamos el componente
    render(<Statistics />);

    // Verificamos que se haya hecho la solicitud con la URL correcta
    expect(global.fetch).toHaveBeenCalledWith(`http://localhost:8000/statistics?userId=${userId}`);

   // Verificamos que se muestre una tabla
const table = await screen.findByRole('table');
expect(table).toBeInTheDocument();

// Verificar que la tabla contiene las columnas esperadas
const columnHeaders = ['Partidas Jugadas', 'Preguntas Acertadas', 'Preguntas Falladas'];
const headerElements = screen.getAllByRole('columnheader');
columnHeaders.forEach(headerText => {
  expect(headerElements.some(header => header.textContent === headerText)).toBeTruthy();
});

// Verificar que la tabla contiene los datos esperados
const tableRows = screen.getAllByRole('row');
expect(tableRows.length).toBeGreaterThan(1); // Verificar que hay más de una fila (encabezados + datos)
const dataRows = tableRows.slice(1); // Ignorar la primera fila que son los encabezados
dataRows.forEach(row => {
  const cells = row.querySelectorAll('td'); // Obtener todas las celdas de la fila
  expect(cells.length).toBe(3); // Verificar que hay exactamente 3 celdas por fila
   expect(cells[0]).toHaveTextContent('10'); // Verificar que la primera celda contiene el número de partidas jugadas
   expect(cells[1]).toHaveTextContent('7'); // Verificar que la segunda celda contiene el número de preguntas acertadas
   expect(cells[2]).toHaveTextContent('3'); // Verificar que la tercera celda contiene el número de preguntas falladas
});

  });

  it('displays an error message when fetching statistics fails', async () => {
    // Simulamos el usuario almacenado en localStorage
    const userId = 'testUser';
    localStorage.setItem('username', userId);

    // Mock de la respuesta de la API para simular un error
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Failed to fetch'));

    // Renderizamos el componente
    render(<Statistics />);

    // Verificamos que se haya hecho la solicitud con la URL correcta
    expect(global.fetch).toHaveBeenCalledWith(`http://localhost:8000/statistics?userId=${userId}`);

    // Verificamos que se muestre el mensaje de error
    await screen.findByText(/Ha habido un error cargando las estadísticas/i);
  });
});

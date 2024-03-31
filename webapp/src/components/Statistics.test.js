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

    // Verificamos que se muestren los datos de las estadísticas
    await screen.findByText(/Partidas jugadas/i);
    expect(screen.getByText(/Preguntas Acertadas/i)).toBeInTheDocument();
    expect(screen.getByText(/Preguntas Falladas/i)).toBeInTheDocument();
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

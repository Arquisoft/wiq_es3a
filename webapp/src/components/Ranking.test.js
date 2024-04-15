import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';;
import Ranking from './Ranking';
import AuthProvider from './login/AuthProvider';
import userEvent from '@testing-library/user-event';

describe('Ranking component', () => {

    test('ranking título', async () => {
        render(<Ranking />);
        expect(screen.getByText('Ranking')).toBeInTheDocument();
  });

  it('muestra la opción seleccionada por defecto como "Porcentaje de Acierto"', () => {
    render(<Ranking />);
    expect(screen.getByDisplayValue('Porcentaje de Acierto')).toBeInTheDocument();
  });

  it('cambia la métrica seleccionada (respuestas correctas) cuando se cambia el valor del select', async () => {
    render(<AuthProvider> <Ranking /> </AuthProvider>);
    const select = screen.getByRole('combobox');
    userEvent.selectOptions(select, 'correctAnswers');
    await waitFor(() => {
      expect(screen.getByText('Respuestas Correctas')).toBeInTheDocument();
    });
  });

  it('cambia la métrica seleccionada (partidas jugadas) cuando se cambia el valor del select', async () => {
    render(<AuthProvider> <Ranking /> </AuthProvider>);
    const select = screen.getByRole('combobox');
    userEvent.selectOptions(select, 'gamesPlayed');
    await waitFor(() => {
      expect(screen.getByText('Respuestas Correctas')).toBeInTheDocument();
    });
  });

  test('obtiene ranking con métrica Porcentaje de Aciertos', async () => {
    // Mock response data
    const mockRankingData = [
      { username: 'user1', accuracy: 80 },
      { username: 'user2', accuracy: 75 },
    ];

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockRankingData),
    };
    jest.spyOn(global, 'fetch').mockResolvedValueOnce(mockResponse);

    // Render the component
    render(<Ranking />);

    // Select option from the dropdown
    const select = screen.getByRole('combobox');
    userEvent.selectOptions(select, 'accuracy');

    // Verificamos que se haya hecho la solicitud con la URL correcta
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/ranking/accuracy');
    
     
    // Check if the fetched data is rendered
    expect(await screen.findByText('user1')).toBeInTheDocument();
    expect(screen.getByText('80')).toBeInTheDocument();
    expect(screen.getByText('user2')).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument();
  });

  test('obtiene ranking con métrica Respuestas Correctas', async () => {
    // Mock response data
    const mockRankingData = [
      { username: 'user2', correctAnswers: 85 },
      { username: 'user3', correctAnswers: 90 },
      // Add more mock data as needed
    ];

    // Mock fetch function
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockRankingData),
    });

    // Render the component
    render(<Ranking />);

    // Select option from the dropdown
    const select = screen.getByRole('combobox');
    userEvent.selectOptions(select, 'correctAnswers');

    // Wait for the component to fetch data and update
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:8000/ranking/correctAnswers');
    });
    
     
    // Check if the fetched data is rendered
    expect(await screen.findByText('user2')).toBeInTheDocument();
    expect(screen.getByText('85')).toBeInTheDocument();
    expect(screen.getByText('user3')).toBeInTheDocument();
    expect(screen.getByText('90')).toBeInTheDocument();
  });

  test('obtiene ranking con métrica Partidas Jugadas', async () => {
    // Mock response data
    const mockRankingData = [
      { username: 'user1', gamesPlayed: 80 },
      { username: 'user2', gamesPlayed: 75 },
      // Add more mock data as needed
    ];

    // Mock fetch function
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockRankingData),
    });

    // Render the component
    render(<Ranking />);

    // Select option from the dropdown
    const select = screen.getByRole('combobox');
    userEvent.selectOptions(select, 'gamesPlayed');

    // Wait for the component to fetch data and update
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:8000/ranking/gamesPlayed');
    });
    
     
    // Check if the fetched data is rendered
    expect(await screen.findByText('user1')).toBeInTheDocument();
    expect(screen.getByText('80')).toBeInTheDocument();
    expect(screen.getByText('user2')).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument();
  });

  it('muestra un mensaje de error cuando falla la llamada a la API', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Error: Ha ocurrido un error al obtener el ranking' }),
      })
    );

    render(<AuthProvider> <Ranking /> </AuthProvider>);
    await waitFor(() => {
      expect(screen.getByText(/Error al obtener el ranking/i)).toBeInTheDocument();
    });
  });
  
});

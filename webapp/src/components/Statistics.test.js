import { render, screen } from '@testing-library/react';
import Statistics from './Statistics';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(axios);
const gatewayEndpoint = process.env.GATEWAY_SERVICE_URL || 'http://localhost:8000';

beforeEach(() => {
  mockAxios.reset();
});

test('user statistics', async () => {
   
    render(<Statistics />);
    let statisticWordArray=screen.getAllByText(/Estadísticas/i)
    for(let i=0;i<2;i++){
      expect(statisticWordArray[i]).toBeInTheDocument();
    }
  });

  
  test('renders statistics table correctly', async () => {
     
    // Configuramos axios-mock-adapter para que devuelva userData cuando se haga una solicitud a la URL deseada
    mockAxios.onGet(`${gatewayEndpoint}/statistics?userId=felipe`).reply(200, {
      gamesPlayed: 10,
      rigthAnswers: 7,
      wrongAnswers: 3
    });
  
    // Renderizamos el componente Statistics
    render(<Statistics />);

    expect(screen.getByText(/Cargando estadísticas.../i)).toBeInTheDocument();

    // Verifica "Partidas jugadas" 
    expect(await screen.findByText('Partidas Jugadas')).toBeInTheDocument();

    // Verifica "Preguntas acertadas" 
    expect(screen.getByText('Preguntas Acertadas')).toBeInTheDocument();

    // Verifica "Preguntas falladas" 
    expect(screen.getByText('Preguntas Falladas')).toBeInTheDocument();

  }); 
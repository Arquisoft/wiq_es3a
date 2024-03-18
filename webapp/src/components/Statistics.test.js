import { render, screen } from '@testing-library/react';
import Statistics from './Statistics';

test('Estadísticas de usuario', async () => {
   
    render(<Statistics />);
    expect(screen.getByText(/Loading questions.../i)).toBeInTheDocument();
  
    // Wait for the asynchronous operation to complete
    await screen.findByRole('button', { name: /correcta/i });
  
    const correcta = screen.getByRole('button', { name: /correcta/i });
    fireEvent.click(correcta);
  });
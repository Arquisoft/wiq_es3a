import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Primera from './Primera';

describe('Primera component', () => {
  it('should render the title', () => {
    render(<Router><Primera /></Router>);
    const title = screen.getByText(/Saber y Ganar: El Juego/i);
    expect(title).toBeInTheDocument();
  });

  it('should render the login link', () => {
    render(<Router><Primera /></Router>);
    const loginLink = screen.getByText(/INICIAR SESIÓN/i);
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', process.env.RUTA_LOGIN || '/login');
  });
});
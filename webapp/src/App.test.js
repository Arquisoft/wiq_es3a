import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Saber y Ganar: El Juego/i);
  expect(linkElement).toBeInTheDocument();
});

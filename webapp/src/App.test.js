import { render, screen } from '@testing-library/react';
import App from './App';

test('renders primera', () => {
  render(<App />);
  const linkElement = screen.getByText(/Saber y Ganar: El Juego/i);
  expect(linkElement).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import Primera from './Primera';

test('renders learn react link', () => {
  render(<Primera />);
  const linkElement = screen.getByText(/Saber y Ganar: El Juego/i);
  expect(linkElement).toBeInTheDocument();
});
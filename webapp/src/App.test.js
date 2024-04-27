import React from 'react';
import App from './App';
import { render, waitFor, screen } from '@testing-library/react';

test('renders primera', async() => {
  render(<App />);
  
  const linkElement = screen.getByText(/Saber y Ganar: El Juego/i);
  expect(linkElement).toBeInTheDocument();
});
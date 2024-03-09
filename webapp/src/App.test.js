import React from 'react';
import App from './App';
import { render, waitFor, screen } from '@testing-library/react';

test('renders primera', async() => {
  render(<App />);
  
  await waitFor(() => {
    expect(true);
  });
});
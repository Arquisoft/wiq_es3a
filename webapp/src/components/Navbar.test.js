import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from './Navbar';
import AuthProvider from './login/AuthProvider';

test('renders navbar', () => {
  render(<AuthProvider><Router> <Navbar /></Router></AuthProvider>);
  const linkElement = screen.getByText("Home");
  expect(linkElement).toBeInTheDocument();

  const linkElement2 = screen.getByText("Ranking");
  expect(linkElement2).toBeInTheDocument();
});
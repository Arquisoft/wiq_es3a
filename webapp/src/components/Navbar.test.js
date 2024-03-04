import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from './Navbar';

test('renders navbar', () => {
  render(<Router> <Navbar /></Router>);
  const linkElement = screen.getByText("Home");
  expect(linkElement).toBeInTheDocument();

  const linkElement2 = screen.getByText("Login");
  expect(linkElement2).toBeInTheDocument();
});
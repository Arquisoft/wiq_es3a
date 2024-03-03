import { render, screen } from '@testing-library/react';
import Inicio from './Inicio';

test('renders learn react link', () => {
  render(<Inicio />);
  const linkElement = screen.getByText(/Welcome to the 2024 edition of the Software Architecture course/i);
  expect(linkElement).toBeInTheDocument();
});

test('test mostrar login', () => {
    render(<Inicio />);
    const linkElement = screen.getByText("Login");
    expect(linkElement).toBeInTheDocument();
  });

test('test crear cuenta', () => {
render(<Inicio />);
fireEvent.click(screen.getByText("Don't have an account? Register here."));
const linkElement = screen.getByText("Already have an account? Login here.");
  expect(linkElement).toBeInTheDocument();
});
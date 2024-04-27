import { render, screen, fireEvent } from '@testing-library/react';
import Inicio from './Inicio';
import AuthProvider from './login/AuthProvider';

test('renders learn react link', () => {
  render(<AuthProvider><Inicio /></AuthProvider>);
  const linkElement = screen.getByText(/Welcome to WIQ/i);
  expect(linkElement).toBeInTheDocument();
});

test('test mostrar login', () => {
    render(<AuthProvider><Inicio /></AuthProvider>);
    const linkElement = screen.getByRole('button', {
        name: /login/i
      })
    expect(linkElement).toBeInTheDocument();
  });

test('test crear cuenta', () => {
render(<AuthProvider><Inicio /></AuthProvider>);
fireEvent.click(screen.getByRole('button', {
    name: "Don't have an account? Register here."
  }));
const linkElement = screen.getByText("Already have an account? Login here.");
  expect(linkElement).toBeInTheDocument();
});
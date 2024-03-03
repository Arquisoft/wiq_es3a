import { render, screen, fireEvent } from '@testing-library/react';
import Inicio from './Inicio';

test('renders learn react link', () => {
  render(<Inicio />);
  const linkElement = screen.getByText(/Welcome to the 2024 edition of the Software Architecture course/i);
  expect(linkElement).toBeInTheDocument();
});

test('test mostrar login', () => {
    render(<Inicio />);
    const linkElement = screen.getByRole('button', {
        name: /login/i
      })
    expect(linkElement).toBeInTheDocument();
  });

test('test crear cuenta', () => {
render(<Inicio />);
fireEvent.click(screen.getByRole('button', {
    name: /Don't have an account? Register here./i
  }));
const linkElement = screen.getByText("Already have an account? Login here.");
  expect(linkElement).toBeInTheDocument();
});
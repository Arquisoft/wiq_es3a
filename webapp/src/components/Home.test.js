import { render, screen } from '@testing-library/react';
import Home from './Home';
import userEvent from '@testing-library/user-event';
import {BrowserRouter} from 'react-router-dom';
import AuthProvider from './login/AuthProvider';

let assignMock = jest.fn();

delete window.location;
window.location = { assign: assignMock };

afterEach(() => {
  assignMock.mockClear();
});


test('iniciar', () => {
  render(<AuthProvider><Home /></AuthProvider>);
  const linkElement = screen.getByText(/BIENVENIDO/i);
  expect(linkElement).toBeInTheDocument();
  expect(screen.getByText(/PULSA EL BOTÓN PARA JUGAR/i)).toBeInTheDocument();
});

test('jugar', async () => {
    render(<AuthProvider><Home /></AuthProvider>, {wrapper: BrowserRouter});
    const user = userEvent.setup()
    const jugarButton = screen.getByRole('button', { name: /JUGAR/i });
    await user.click(jugarButton);
    //expect(screen.getByText(/Loading questions.../i)).toBeInTheDocument()

});
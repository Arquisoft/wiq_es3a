import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AddUser from './AddUser';
import AuthProvider from '../login/AuthProvider';

const mockAxios = new MockAdapter(axios);

const mockStorage = () => {
  let storage = {};

  return {
    setItem:(key, value) => {
     storage[key] = value || '';
    },
    getItem: (key) => {
     return storage[key] || null;
    },
    removeItem: (key) => {
     delete storage[key];
    },
    clear: function() {
     store = {};
    },
    getLength: () => {
     return Object.keys(storage).length;
    },
    key: function(i) {
     const keys = Object.keys(storage);
     return keys[i] || null;
    }
  };
};

describe('AddUser component', () => {
  beforeEach(() => {
    mockAxios.reset();

    window.localStorage = mockStorage();
    window.sessionStorage = mockStorage();
  });

  it('should add user successfully', async () => {
    render(<AuthProvider><AddUser /></AuthProvider>);
    
    /*const usernameInput = screen.getByLabelText(/Nombre de Usuario/i);    
    const nameInput = screen.getByLabelText(/Nombre/i);
    const surnameInput = screen.getByLabelText(/Apellidos/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);    
    const password2Input = screen.getByLabelText(/Repetir contraseña/i);*/

    
    const usernameInput = document.getElementById("username");    
    const nameInput = document.getElementById("name"); 
    const surnameInput = document.getElementById("surname"); 
    const passwordInput = document.getElementById("password");   
    const password2Input = document.getElementById("password2"); 

    const addUserButton = screen.getByRole('button', { name: /Registrarse/i });

    // Mock the axios.post request to simulate a successful response
    mockAxios.onPost('http://localhost:8000/adduser').reply(200);

    let response = 
    `{
      "token":"12345"
    }`;

    axios.mockReturnValue(()=>
      Promise.resolve(
        {
          data:response
        })
      );
    
    mockAxios.onPost('http://localhost:8000/login').reply(200);

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });  
    fireEvent.change(nameInput, { target: { value: 'testUser' } });      
    fireEvent.change(surnameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });  
    fireEvent.change(password2Input, { target: { value: 'testPassword' } });

    // Trigger the add user button click
    fireEvent.click(addUserButton);

    // Wait for the Snackbar to be open
    await waitFor(() => {
      expect(screen.getByText(/Añadir usuario/i)).toBeInTheDocument();
    });
  });

  it('should handle error when adding user', async () => {
    render(<AddUser />);

    const usernameInput = document.getElementById("username");    
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    const addUserButton = screen.getByRole('button', { name: /Registrarse/i });

    // Mock the axios.post request to simulate an error response
    mockAxios.onPost('http://localhost:8000/adduser').reply(500, { error: 'Internal Server Error' });

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    // Trigger the add user button click
    fireEvent.click(addUserButton);

    // Wait for the error Snackbar to be open
    await waitFor(() => {
      expect(screen.getByText(/Error: No se permite dejar espacios en blanco/i)).toBeInTheDocument();
    });
  });
});

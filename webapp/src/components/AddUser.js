// src/components/AddUser.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
import './AddUser.css';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const AddUser = () => {
  const [name, setName] = useState('');
  const [surname, setSurName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const addUser = async () => {
    try {
      await axios.post(`${apiEndpoint}/adduser`, { 
        name,
        surname,
        username, 
        password,
        passwordRepeat
      });
      setOpenSnackbar(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main">
      <div className="register-container">
        <div className='text'>
          <Typography variant="h4">
            Añadir usuario
          </Typography>
        </div>
        <div className="underline"></div>
        <div className='input'>
        <TextField
          name="name"
          margin="normal"
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id = "input"
        />
        </div>
        <div className='input'>
        <TextField
          name="surname"
          margin="normal"
          fullWidth
          label="Apellidos"
          value={surname}
          onChange={(e) => setSurName(e.target.value)}
          id = "input"
        />
        </div>
        <div className='input'>
        <TextField
          name="username"
          margin="normal"
          fullWidth
          label="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id = "input"
        />
        </div>
        
        <div className='input'>
        <TextField
          name="password"
          margin="normal"
          fullWidth
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id = "input"
        />
        </div>
        
        <div className='input'>
        <TextField
          name="passwordRepeat"
          margin="normal"
          fullWidth
          label="Repetir contraseña"
          type="password"
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
          id = "input"
        />
        </div>
        <div className="underline"></div>
        <div className='button'>
        <Button variant="contained" onClick={addUser}>
          Registrarse
        </Button>
        </div>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message="User registrado correctamente"
        />
        {error && (
          <Snackbar
            open={!!error}
            autoHideDuration={6000}
            onClose={() => setError("")}
            message={`Error: ${error}`}
          />
        )}
      </div>
    </Container>
  );
};

export default AddUser;

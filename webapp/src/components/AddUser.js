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
    <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
      <div className="register-container">
        <Typography component="h1" variant="h5">
          Añadir usuario
        </Typography>
        <TextField
          name="name"
          margin="normal"
          fullWidth
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          name="surname"
          margin="normal"
          fullWidth
          label="Apellidos"
          value={surname}
          onChange={(e) => setSurName(e.target.value)}
        />
        <TextField
          name="username"
          margin="normal"
          fullWidth
          label="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          name="password"
          margin="normal"
          fullWidth
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          name="passwordRepeat"
          margin="normal"
          fullWidth
          label="Repetir contraseña"
          type="password"
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={addUser}>
          Registrarse
        </Button>
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

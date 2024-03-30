// src/components/Login.js
import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
import './Login.css';
import logo from '../logo.png';
import { useAuth } from "./AuthProvider";


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  const { setToken } = useAuth();


  const loginUser = async () => {
    try {
      let res= await axios.post(`${apiEndpoint}/login`, { username, password });

      // Extract data from the response
      setToken(res.data.token);
      console.log(res);
      
      setLoginSuccess(true);

      setOpenSnackbar(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const checkForm = () =>
  {
    if(username.trim().length ===0 || password.trim().length===0)
    {
      setError("No se permite dejar espacios en blanco");
      return;  
    }

    loginUser();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (loginSuccess) {
      // Redirigir a la página de inicio después de 2 segundos
      setTimeout(() => {
        window.location.href = '/home';
      }, 2000);
    }
  }, [loginSuccess]);
  
  
  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 8 }}>
       <div className='logo-container' >
         <img src={logo} alt='Logo wiq'></img>
       </div>
    
        <div className="login-container">
       
           <div className='text'>
          <Typography component="h1" variant="h5" >
            Login
          </Typography>
          </div>
          <div className="underline"></div>
        <div className='input'>
          <TextField 
            margin="normal"
            fullWidth
            label="Username"
            id="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          </div>
          <div className='input'>
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="input"
          />
          </div>
          <div className="underline"></div>
          <div className='button'>
          <Button variant="contained" color="primary" onClick={checkForm()}>
            Login
          </Button>
          </div>
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message="Login successful" />
          {error && (
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} message={`Error: ${error}`} />
          )}
        </div>
      
    </Container>
  );
};

export default Login;

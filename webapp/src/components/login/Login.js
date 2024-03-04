// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
import './Login.css';
import Link from '@mui/material/Link';
import logo from './logo.png'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [createdAt, setCreatedAt] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  const loginUser = async () => {
    try {
      const response = await axios.post(`${apiEndpoint}/login`, { username, password });

      // Extract data from the response
      const { createdAt: userCreatedAt } = response.data;

      setCreatedAt(userCreatedAt);
      setLoginSuccess(true);

      setOpenSnackbar(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  
  

  return (
    <Container component="main" maxWidth="s" sx={{ marginTop: 8 }}>
       <div className='logo-container' >
         <img src={logo} alt='Logo wiq'></img>
       </div>
      {loginSuccess ? (
        
        <div>
          <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
            Hello {username}!
          </Typography>
          <Typography component="p" variant="body1" sx={{ textAlign: 'center', marginTop: 2}}>
            Your account was created on {new Date(createdAt).toLocaleDateString()}.
          </Typography>
        </div>
      ) : (
        
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
          <Button variant="contained" color="primary" onClick={loginUser}>
            Login
          </Button>
          </div>
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message="Login successful" />
          {error && (
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} message={`Error: ${error}`} />
          )}
        </div>
      )}
    </Container>
  );
};

export default Login;
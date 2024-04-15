import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Login from './login/Login';
import AddUser from './register/AddUser';
import Link from '@mui/material/Link';
import './login/Login.css';


function Inicio() {
    const [showLogin, setShowLogin] = useState(true);

  const handleToggleView = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Container className='fondo-gradiente'>
        <CssBaseline />
      <Typography className='titulo' component="h1" variant="h5" align="center"  sx={{ marginTop: 2, marginBottom: 2, fontWeight:"bold"}}>
        Welcome to WIQ
      </Typography>
      {showLogin ? <Login /> : <AddUser />}
      <Typography component="div" align="center" sx={{ marginTop: 2 }}>
        {showLogin ? (
          <Link className='boton-registrar' name="gotoregister" component="button" color={'#ffff5f'} variant="body2" onClick={handleToggleView}>
            Don't have an account? Register here.
          </Link>
        ) : (
          <Link component="button" variant="body2" onClick={handleToggleView}>
            Already have an account? Login here.
          </Link>
        )}
      </Typography>
    </Container>
    );
}

export default Inicio;
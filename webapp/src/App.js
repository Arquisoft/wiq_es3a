import React, { useState } from 'react';
import AddUser from './components/AddUser';
import Login from './components/Login';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Inicio from './components/Inicio';
//import Link from '@mui/material/Link';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const handleToggleView = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />       
      <Inicio/>   
    </Container>
  );
}

export default App;

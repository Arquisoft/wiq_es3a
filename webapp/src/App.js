import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Inicio from './components/Inicio';

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

import React, { useState } from 'react';
import AddUser from './components/AddUser';
import Login from './components/Login';
import Game  from './components/QuizGame';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function App() {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggleView = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Game />
    </Container>
  );
}

export default App;

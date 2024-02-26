import React, { useState } from 'react';
import AddUser from './components/AddUser';
import Login from './components/Login';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
//import Link from '@mui/material/Link';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const handleToggleView = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
        Welcome to the 2024 edition of the Software Architecture course
      </Typography>
      {showLogin ? <Login /> : <AddUser />}
      <Typography component="div" align="center" sx={{ marginTop: -5 }}>
        {showLogin ? (
          <button name="gotoregister" type="button" onClick={handleToggleView}>
            Register
          </button>
        ) : (
          <button type="button" onClick={handleToggleView}>
            Login
          </button>
        )}
      </Typography>
    </Container>
  );
}

export default App;

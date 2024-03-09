import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Home() {

  return (
    
    <Container component="home" maxWidth="xs">


      <CssBaseline />
      <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
        HOME
      </Typography>
      <Button variant="contained" color="primary" fullWidth onClick={() => { window.location.href = '/game'; }}>
        Go to Game
      </Button>
    </Container>
  );
}

export default Home;

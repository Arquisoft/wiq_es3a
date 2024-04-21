import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import "./Home.css";
import Parameters from './Parameters';

function Home() {


  return (
    <div className="home">
      <img className="imagenHome" src="/saber-ganar-logo.png" alt="Logo" />

      <Container className="boxHome" maxWidth="xs">
        <CssBaseline />

        <Typography className="tituloHome_h1" component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
          BIENVENIDO
        </Typography>

        <Typography className="tituloHome" component="h2" variant="h5" align="center" sx={{ marginTop: 2 }}>
        PULSA EL BOTÓN PARA JUGAR
        </Typography>
        <Button className="botonHome" variant="contained" color="primary" fullWidth onClick={window.location.href = '/game'}>
          JUGAR
        </Button>
      </Container>
      <Parameters />            
    </div>
  );
}

export default Home;

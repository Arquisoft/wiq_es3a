import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import "./Inicio.css";

function Inicio() {

  document.body.style.backgroundImage = 'url(/background.png)';
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = 'top';
  document.body.style.backgroundSize = 'cover';
  document.body.style.height ='30em';

  return (
    <Container>
        <CssBaseline />
      <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 20 }}>
        Saber y Ganar: El Juego
      </Typography>
    </Container>
    );
}

export default Inicio;
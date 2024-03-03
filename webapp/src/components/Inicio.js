import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import "./Inicio.css";

function Inicio() {
  
  const styles =
  {  
    backgroundImage:"url(/background.jpg)",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: '100%', 
    
    fontWeight:"bold",
    fontSize:"larger",
    color:"#FFFF"
  };

  return (
    <Container>
      <CssBaseline />
      <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 50 }}>
        Saber y Ganar
      </Typography>
    </Container>
    );
}

export default Inicio;
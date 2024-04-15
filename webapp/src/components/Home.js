import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@mui/material';
import {useAuth} from "./login/AuthProvider";
import "./Home.css";

function Home() {

  const {numeroPreguntas, setNumPreguntas, timepoJuego , setTiempoJuego} = useAuth();

  const iniciarPartida = () =>
  {
    window.location.href = '/game';
  };

  const cambioPara = (event) =>
  {
    let v = event.target.value.split("|");
    setNumPreguntas(v[0]);
    setTiempoJuego(v[1]);
  };

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
        <Button className="botonHome" variant="contained" color="primary" fullWidth onClick={iniciarPartida}>
          JUGAR
        </Button>
      </Container>      
      <Container className='boxHome' maxWidth="xs">
        <FormControl>
          <FormLabel>PARÁMETROS DE LA PARTIDA:</FormLabel>
          <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          defaultValue={"9|150"}
          value={''}
          onChange={cambioPara}>
            <FormControlLabel value="9|150" control={<Radio />} label="Predeterminado"/>              
            <FormControlLabel value="5|60" control={<Radio />} label="Partida Corta"/>                           
            <FormControlLabel value="10|90" control={<Radio />} label="Partida Media"/>                          
            <FormControlLabel value="20|210" control={<Radio />} label="Partida Larga"/>               
          </RadioGroup>
        </FormControl>
      </Container>
      
    </div>
  );
}

export default Home;

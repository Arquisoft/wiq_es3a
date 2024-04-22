
import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import {Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@mui/material';
import {useAuth} from "./login/AuthProvider";
function Parameters(){
    

  const {numeroPreguntas, setNumPreguntas, tiempoJuego, setTiempoJuego} = useAuth();

    const cambioPara = (event) =>
    {
      let v = event.target.value.split("|");
      setNumPreguntas(v[0]);
      setTiempoJuego(v[1]);
    };

    return (

    <Container className='boxHome' maxWidth="xs">
        <h3>
          Parámetros Actuales
        </h3>
        <ul>
          <li><h4>Tiempo de Juego: {tiempoJuego} segundos</h4></li>
          <li><h4>Número de Preguntas: {parseInt(numeroPreguntas)+1}</h4></li>
        </ul>
        <FormControl>
        <FormLabel>Parámetros de la Partida:</FormLabel>
        <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        defaultValue={"9|150"}
        value={''}
        onChange={cambioPara}>
            <FormControlLabel value="9|150" control={<Radio />} label="Predeterminado" id="predeterminado"/>              
            <FormControlLabel value="5|60" control={<Radio />} label="Partida Corta" id="corta"/>                           
            <FormControlLabel value="10|90" control={<Radio />} label="Partida Media" id="media"/>                          
            <FormControlLabel value="20|210" control={<Radio />} label="Partida Larga" id="larga"/>               
        </RadioGroup>
        </FormControl>        
    </Container>
    );
}

export default Parameters;

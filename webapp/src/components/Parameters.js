
import React, {useState} from 'react';
import Container from '@mui/material/Container';
import {Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@mui/material';
import {useAuth} from "./login/AuthProvider";

function Parameters(){

  const {numeroPreguntas, setNumPreguntas, tiempoJuego, setTiempoJuego} = useAuth();

  const localStorageNumPreguntas = localStorage.getItem('numeroPreguntas');
  const localStorageTiempoJuego = localStorage.getItem('tiempoJuego');

  const initialSelectedValue = localStorageNumPreguntas && localStorageTiempoJuego
    ? `${localStorageNumPreguntas}|${localStorageTiempoJuego}`
    : `${numeroPreguntas}|${tiempoJuego}`;  

  const [selectedValue, setSelectedValue] = useState(initialSelectedValue);

  const cambioPara = (event) =>
  {
    let v = event.target.value.split("|");
    setNumPreguntas(v[0]);
    setTiempoJuego(v[1]);

    // Actualiza el valor seleccionado
    setSelectedValue(event.target.value);
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
        value={selectedValue} 
        onChange={cambioPara}>
            <FormControlLabel value="9|120" control={<Radio />} label="Predeterminado" id="predeterminado"/>              
            <FormControlLabel value="4|60" control={<Radio />} label="Partida Corta" id="corta"/>                           
            <FormControlLabel value="11|150" control={<Radio />} label="Partida Media" id="media"/>                          
            <FormControlLabel value="19|240" control={<Radio />} label="Partida Larga" id="larga"/>           
        </RadioGroup>
        </FormControl>        
    </Container>
    );
}

export default Parameters;

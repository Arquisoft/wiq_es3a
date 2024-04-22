
import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import {Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@mui/material';
import {useAuth} from "./login/AuthProvider";
function Parameters(){
    

  const {setNumPreguntas, setTiempoJuego} = useAuth();

    const cambioPara = (event) =>
    {
      let v = event.target.value.split("|");
      setNumPreguntas(v[0]);
      setTiempoJuego(v[1]);
    };
    
    return (

    <Container className='boxHome' maxWidth="xs">
        <FormControl>
        <FormLabel>PARÁMETROS DE LA PARTIDA:</FormLabel>
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

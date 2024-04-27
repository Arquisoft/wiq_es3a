import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Box from "@mui/material/Box";
import Grid from '@mui/material/Unstable_Grid2';
import LoginIcon from '@mui/icons-material/Login';
import "./Primera.css";

function Primera() {

  return (
  <div className="fondo-gradiente">
     <CssBaseline />
     <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  minHeight="100vh"
>
        <Grid className="grid-titulo"
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch">
          <Typography className='h1-titulo text-shadow-pop-tr' variant="h1" align="left">
            SABER <br/>
            Y GANAR: <br/>
            EL JUEGO
          </Typography>
          <Button className='boton-login' endIcon={<LoginIcon />} href={process.env.RUTA_LOGIN || '/login'} >
            INICIAR SESIÓN
          </Button>
        </Grid>
        <div className="fondo-pagina fade-in-right"></div>
    </Box>
    
    </div>
    );
}

export default Primera;
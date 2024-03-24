import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { NavLink } from "react-router-dom";
import "./Primera.css";

function Primera() {

 

  return (
  <div class="box">
    <Container>      
        <CssBaseline />
      <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 20 }}>
        Saber y Ganar: El Juego
      </Typography>
      <NavLink to={process.env.RUTA_LOGIN || '/login'} className="MuiTypography-root MuiTypography-h5 MuiTypography-alignCenter css-1sub1o7">
        INICIAR SESIÓN
      </NavLink>
    </Container>
    </div>
    );
}

export default Primera;
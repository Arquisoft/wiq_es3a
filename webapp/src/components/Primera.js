import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import "./Primera.css";

function Primera() {

 

  return (
  <div className="box">
    <Container>      
        <CssBaseline />
      <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 20 }}>
        Saber y Ganar: El Juego
      </Typography>      
    </Container>
    </div>
    );
}

export default Primera;
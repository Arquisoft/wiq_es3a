import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Primera from './components/Primera';

function App() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />       
      <Primera/>   
    </Container>
  );
}

export default App;

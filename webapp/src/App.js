import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Inicio from './components/Inicio';
import Primera from './components/Primera';
import Statistics from './components/Statistics';
import Game from './components/QuizGame';

function App() {

  return (
    <Router>
    <Navbar />
    <main className="main-content">
      <Routes>
        <Route path={process.env.RUTA_INICIO || '/'} element={<Primera />} />
        <Route path={process.env.RUTA_LOGIN || '/login'} element={<Inicio />} />
        <Route path={process.env.RUTA_HOME || '/home'} element={<Home />} />
        <Route path={process.env.RUTA_GAME || '/game'} element={<Game />} />
        <Route path={process.env.RUTA_USER || '/user'} element={<Statistics />} />
      </Routes>
    </main>
  </Router>  

  );
}

export default App;

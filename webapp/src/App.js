import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthProvider from './components/login/AuthProvider';
import Routes from './components/Routes';

function App() {

  return (
    <main className="main-content">
    <AuthProvider>
      <Routes />
    </AuthProvider>
    </main> 
  );
}

export default App;

import React from 'react';
import AuthProvider from './components/login/AuthProvider';
import Routes from './components/Routes';
import Footer from "./components/footer/Footer"; 

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

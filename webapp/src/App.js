import React from 'react';
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

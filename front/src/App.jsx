// App.jsx


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginButton from './components/auth0/LoginButton';
import Dashboard from './Dashboard';  // Página principal
import './App.css';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated, user} = useAuth0();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginButton />} />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard user={user} /> : <LoginButton />} 
        />
      </Routes>
    </Router>
  );
}

export default App;

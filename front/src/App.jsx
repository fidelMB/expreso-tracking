import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import './App.css';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated, user} = useAuth0();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard user={user} /> : <Login />} 
        />
      </Routes>
    </Router>
  );
}

export default App;

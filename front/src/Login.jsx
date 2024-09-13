import React, { useState } from 'react';
import LoginButton from './components/auth0/LoginButton';
import RegisterButton from './components/auth0/RegisterButton';
import RolButton from './components/auth0/RolButton';
import RouteButton from './components/auth0/RouteButton';
import { Divider, Input } from "antd";

function Login() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedRol, setSelectedRol] = useState(null);
  const [email, setEmail] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="app-container">
      <div className='register-container'>
          <div className='register-elements'>
              <h1>Regístrate</h1>
              <Input placeholder='Correo electrónico' value={email} onChange={handleInputChange} />
              <RolButton selectedRol={selectedRol} setSelectedRol={setSelectedRol} />
              <RouteButton selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
              <RegisterButton email={email} selectedRol={selectedRol} selectedItem={selectedItem} />
              <Divider plain>o</Divider>
              <p>¿Ya tienes una cuenta?</p>
              <LoginButton />
          </div>
      </div>
    </div>
  );
}

export default Login;
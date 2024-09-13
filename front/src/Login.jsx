import React from 'react';
import LoginButton from './components/auth0/LoginButton';
import RegisterButton from './components/auth0/RegisterButton';
import RolButton from './components/auth0/RolButton';
import RouteButton from './components/auth0/RouteButton';
import { Divider, Input } from "antd";

function Login() {
    return (
      <div className="app-container">
        <div className='register-container'>
            <div className='register-elements'>
                <h1>Regístrate</h1>
                <Input placeholder='Correo electrónico' />
                <RolButton />
                <RouteButton />
                <RegisterButton />
                <Divider plain>o</Divider>
                <p>¿Ya tienes una cuenta?</p>
                <LoginButton />
            </div>
        </div>
      </div>
    );
}

export default Login;
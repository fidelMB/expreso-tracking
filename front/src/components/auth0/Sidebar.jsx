//Sidebar.jsx

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Sidebar() {
  const { user, logout } = useAuth0();

  return (
    <div className="sidebar">
      <div className="user-info">
        <img src={user.picture} alt="User" />
        <h3>{user.name}</h3>
        <p>{user.sub}</p>
      </div>
      <nav>
        <ul>
          <li>
            <a href="/">Inicio</a>
          </li>
        </ul>
      </nav>
      <button onClick={() => logout({ returnTo: window.location.origin })}>
        Cerrar sesión
      </button>
    </div>
  );
}

export default Sidebar;

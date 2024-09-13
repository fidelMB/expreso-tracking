//Sidebar.jsx

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton'

function Sidebar( { user, userData } ) {
  const {logout } = useAuth0();

  return (
    <div className="sidebar">
      <div className="user-info">
        <img src={user.picture} alt="User" />
        <h3>{user.name}</h3>
        <h2>{userData?.role ? userData.role : "Cargando..."}</h2>
      </div>
      <nav>
        <ul>
          <li>
            <a href="/">Inicio</a>
          </li>
        </ul>
      </nav>
      <LogoutButton />
      {/* <button onClick={() => logout({ returnTo: window.location.origin })}>
        Cerrar sesión
      </button> */}
    </div>
  );
}

export default Sidebar;

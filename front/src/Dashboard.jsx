//Dashboard.jsx

import React from 'react';
import Sidebar from './components/auth0/Sidebar'; // Usamos tu Sidebar
import Map from './components/auth0/Map';         // Mapa con la imagen temporal
import Filter from './components/auth0/Filter';   // Filtro

function Dashboard() {
    return (
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <div className="header">
            <h2>Ruta - San Nicolás de los Garza</h2>
            <p>1 de enero del 2025</p>
            <Filter />  {}
          </div>
          <Map />
        </div>
      </div>
    );
}

export default Dashboard;
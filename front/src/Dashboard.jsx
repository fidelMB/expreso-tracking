//Dashboard.jsx

import React from 'react';
import Sidebar from './components/auth0/Sidebar'; // Usamos tu Sidebar
import Map from './components/auth0/Map';         // Mapa con la imagen temporal
import Filter from './components/auth0/Filter';   // Filtro
import axios from 'axios';
import { useEffect, useState} from 'react';

function Dashboard({ user }) {
  const [userData, setUserData] = useState({});
  const formattedDate = new Date().toLocaleDateString();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/user-by-email/${user.email}`);
        setUserData(result.data.userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user.email]); // la condición para el useEffect es el email del usuario, si este cambia se vuelve a ejecutar la consulta

  // userData tiene todos los datos del usuario
  // userData: {
  //   email: "",
  //   location: {
  //     latitude: 0,
  //     longitude: 0
  //   },
  //   role: "",
  //   route: ""
  // }

  return (
    <div className="app-container">
    <Sidebar user={user} userData={userData}/>
    <div className="content">
      <div className="header">
      <h2>Ruta - {userData?.route ? userData.route : "Cargando..."}</h2>
      <p>{formattedDate}</p>
      <p>
        Latitud: {userData?.location?.latitude ? userData.location.latitude : "Cargando..."}
        {" "}
        Longitud: {userData?.location?.longitude ? userData.location.longitude : "Cargando..."}
      </p>
      <Filter/>
      </div>
      <Map user={user} userData={userData}/>
    </div>
    </div>
  );
}

export default Dashboard;
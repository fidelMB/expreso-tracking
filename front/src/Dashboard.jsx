//Dashboard.jsx

import React from 'react';
import Sidebar from './components/auth0/Sidebar'; // Usamos tu Sidebar
import GoogleMap from './components/auth0/GoogleMap';         // Mapa con la imagen temporal
import Filter from './components/auth0/Filter';   // Filtro
import axios from 'axios';
import { useEffect, useState} from 'react';

function Dashboard({ user }) {
  const [userData, setUserData] = useState({});
  const formattedDate = new Date().toLocaleDateString();

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

  // Check if geolocation is supported to update the users location
  if ("geolocation" in navigator) {
    // Request the user's current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        try {
          axios.put('http://localhost:3000/update-location', {
            email: user.email,
            latitude: latitude,
            longitude: longitude
          });
        } catch (error) {
          console.error("Error updating location:", error);
        }

      },
      (error) => {
        console.error(`Error getting location: ${error.message}`);
      },
      {
        enableHighAccuracy: true, // Optionally, request high accuracy
        timeout: 5000, // Time in milliseconds before the request times out
        maximumAge: 0 // Maximum age of cached position in milliseconds
      }
    );
  } else {
    console.log("Geolocation is not supported");
  }

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
      {/* <Filter/> */}
      </div>
      <GoogleMap user={user} userData={userData}/>
    </div>
    </div>
  );
}

export default Dashboard;
//Dashboard.jsx

import React from 'react';
import Sidebar from './components/auth0/Sidebar'; // Usamos tu Sidebar
import GoogleMap from './components/auth0/GoogleMap';         // Mapa con la imagen temporal
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
  useEffect(() => {
    if ("geolocation" in navigator) {
      const updateLocation = () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            try {
              axios.put('http://localhost:3000/update-location', {
                email: user.email,
                latitude: latitude,
                longitude: longitude
              });

              setUserData((prevUserData) => ({
                ...prevUserData,
                location: {
                  latitude: latitude,
                  longitude: longitude
                }
              }));

            } catch (error) {
              console.error("Error updating location:", error);
            }
          },
          (error) => {
            console.error(`Error getting location: ${error.message}`);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
        );
      };

      // Update location immediately and then every 15 seconds
      updateLocation();
      const intervalId = setInterval(updateLocation, 15000);

      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    } else {
      console.log("Geolocation is not supported");
    }
  }, [user.email]);

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
      </div>
      <GoogleMap user={user} userData={userData}/>
    </div>
    </div>
  );
}

export default Dashboard;
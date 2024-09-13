//Map.jsx
import React, { useEffect, useState } from "react";
import { AdvancedMarker, APIProvider, InfoWindow, Map, useMapsLibrary, useMap, Marker } from '@vis.gl/react-google-maps';
import axios from "axios";

import logoExpreso from '../../fotos-Expreso/LogoExpresoTecColor.png';
import parada1 from '../../fotos-Expreso/parada1.png'
import parada2 from '../../fotos-Expreso/parada2.png'
import parada3 from '../../fotos-Expreso/parada3.png'
import parada4 from '../../fotos-Expreso/parada4.png'
import parada5 from '../../fotos-Expreso/parada5.png'
import parada6 from '../../fotos-Expreso/parada6.png'
import parada7 from '../../fotos-Expreso/parada7.png'
import busMarker from '../../fotos-Expreso/bus_marker.png';
import you_here from '../../fotos-Expreso/you_here.png';

function GoogleMap({ user, userData }) {
  const [driverLocation, setDriverLocation] = useState({});

  useEffect(() => {
    const fetchDriverLocation = async () => {
      try {
        if (userData?.role === "Student") {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/location-role/Driver`);
          setDriverLocation(response.data[0]);
        }
      } catch (error) {
        // console.error("Error fetching driver location:", error);
      }
    };

    fetchDriverLocation();
    const intervalId = setInterval(fetchDriverLocation, 15000); // Fetch every minute
    console.log("Driver Location:", driverLocation.latitude, driverLocation.longitude);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [userData, driverLocation.latitude, driverLocation.longitude]);
  
  
  const position = { lat: 25.65291648958903, lng: -100.29012925958195 };
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;
  const [open, setOpen] = useState(false);
  const [selectedParada, setSelectedParada] = useState(null);

  const paradas = [
    { key: "parada1", lat: 25.762812424065363, lng: -100.41303695331942, info: "00:00 AV. PUERTA DE HIERRO (ESQ. PROL. RUIZ CORTINES)", numero: 1},
    { key: "parada2", lat: 25.757682802207153, lng: -100.41437976081167, info: "00:05 AV. PUERTA DE HIERRO Y VERONA (ESQ.)", numero: 2},
    { key: "parada3", lat: 25.756320071821868, lng: -100.41099126494939, info: "00:06 AV. VERONA (CERRADAS DE VERONA)", numero: 3},
    { key: "parada4", lat: 25.753710117529323, lng: -100.41043484085162, info: "00:09 AV. MONTE EVEREST (CERRADAS DE CUMBRES)", numero: 4},
    { key: "parada5", lat: 25.745729496320834, lng: -100.41177623668759, info: "00:18 AV. ALEJANDRO DE RODAS (CAMBRIDGE)", numero: 5},
    { key: "parada6", lat: 25.741354670003957, lng: -100.40603598356965, info: "00:23 CUMBRES ELITE (ESQ.)", numero: 6},
    { key: "parada7", lat: 25.738282632797716, lng: -100.40571790461831, info: "00:25 AV. PASEO DE LOS LEONES (PLAZA CIEN)", numero: 7},
  ];

  const icons = {
    1: parada1,
    2: parada2,
    3: parada3,
    4: parada4,
    5: parada5,
    6: parada6,
    7: parada7,
  };

  return (
    <APIProvider apiKey={apiKey}>
      <div style={{ height: "72vh", width: "150vh" }}>
        <Map 
          defaultZoom={15}
          defaultCenter={position}
          mapId={mapId}
          fullscreenControl={false} 
          onCameraChange={(ev) => console.log('Camera changed:', ev.detail.center, 'Zoom:', ev.detail.zoom)}
        >
          
          {driverLocation.latitude && driverLocation.longitude && (
            <AdvancedMarker position={{ lat: driverLocation.latitude, lng: driverLocation.longitude }}>
              <img src={busMarker} alt="Bus Marker" style={{ width: "100%", height: "90px" }}/>
            </AdvancedMarker>
          )}

          {userData?.location?.latitude && userData?.location?.longitude && (
            <AdvancedMarker position={{ lat: userData.location.latitude, lng: userData.location.longitude }}>
              <img src={you_here} alt="Bus Marker" style={{ width: "100%", height: "90px" }}/>
            </AdvancedMarker>
          )}

          <AdvancedMarker 
            position={position} 
            onClick={() => setOpen(true)}
          >
            {/* Add inline CSS to resize the image */}
            <img src={logoExpreso} alt="Logo" style={{ width: "100%", height: "80px" }} />
          </AdvancedMarker>

          {paradas.map((parada) => (
            <AdvancedMarker 
              key={parada.key}
              position={{ lat: parada.lat, lng: parada.lng }}
              onClick={() => setSelectedParada(parada)} // Open InfoWindow for clicked parada
            >
              <img 
                src={icons[parada.numero]}
                alt={`Logo for${parada.key}`} 
                style={{ width: "35px", height: "40px" }} 
              />            
            </AdvancedMarker>
          ))}

          {/* Show InfoWindow for selected parada */}
          {selectedParada && (
            <InfoWindow position={{ lat: selectedParada.lat, lng: selectedParada.lng }} onCloseClick={() => setSelectedParada(null)}>
              <p>{`${selectedParada.info}`}</p>
            </InfoWindow>
          )}

          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>00:35 CAMPUS MONTERREY, EDIFICIO CIAP</p>
            </InfoWindow>
          )}

          <Directions />

        </Map>
      </div>
    </APIProvider>
  );
}

export default GoogleMap;


function Directions() {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");

  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  useEffect(() => {
    if (!routesLibrary || !map) return;

    const renderer = new routesLibrary.DirectionsRenderer({
      map,
      suppressMarkers: true, // Suppress all markers (origin, destination, and waypoints)
    });
    setDirectionsRenderer(renderer);
    setDirectionsService(new routesLibrary.DirectionsService());

    // Clean up the directionsRenderer when component unmounts
    return () => {
      if (renderer) {
        renderer.setMap(null);
      }
    };
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    const request = {
      origin: { lat: 25.65291648958903, lng: -100.29012925958195 }, // Example origin
      destination: { lat: 25.762812424065363, lng: -100.41303695331942 }, // Example destination
      travelMode: window.google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    };

    directionsService
      .route(request)
      .then((response) => {
        directionsRenderer.setDirections(response); // Render directions without markers
      })
      .catch((error) => {
        console.error("Directions request failed due to: ", error);
      });
  }, [directionsService, directionsRenderer]);

  return null; // No visual component, just logic for directions
}


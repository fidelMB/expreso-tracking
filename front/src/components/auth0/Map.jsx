//Map.jsx

import React from 'react';

function Map({ user, userData }) {
  const latitude = userData?.location?.latitude ? userData.location.latitude : "";
  const longitude = userData?.location?.longitude ? userData.location.longitude : "";

  return (
    <div className="map-placeholder">
      <img
        src="https://via.placeholder.com/600x400.png?text=Mapa+Placeholder"
        alt="Mapa temporal"
        style={{ width: '100%', height: '400px' }}
      />
    </div>
  );
}

export default Map;

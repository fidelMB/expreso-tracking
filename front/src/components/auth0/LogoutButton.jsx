//LogoutButton.jsx

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const { logout } = useAuth0();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout({ returnTo: 'https://expreso-tracking.vercel.app/' });
    navigate('/');
  };

  return <button onClick={handleLogout}>Log Out</button>;
}

export default LogoutButton;


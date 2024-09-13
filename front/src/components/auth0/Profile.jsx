//Profile.jsx

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (!isAuthenticated) {
    return <p>Not logged in</p>;
  }

  return (
    isAuthenticated && (
      <div>
        <p>Logged in as:</p>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;
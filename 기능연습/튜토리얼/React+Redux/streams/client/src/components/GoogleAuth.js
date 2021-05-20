import React, { useState, useEffect } from 'react';

const GoogleAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState(null);
  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '1026008969674-urgnfp54da0a0rot6ggevesnehkqndas.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        const auth = window.gapi.auth2.getAuthInstance();
        setIsSignedIn(auth.isSignedIn.get());
      });
    });
  }, []);

  const renderLoginBtn = () => {
    switch(isSignedIn) {
      case null:
        return <div>Unknown</div>
      case true:
        return <div>Hello user !</div>
      default:
        return <div>Sign In</div>
    }
  };

  return(
    <div>
      {renderLoginBtn()}
    </div>
  );
};

export default GoogleAuth;
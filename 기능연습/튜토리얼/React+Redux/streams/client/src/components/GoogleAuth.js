import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { whenSignIn, whenSignOut } from '../components/actions';

const GoogleAuth = ({ whenSignIn, whenSignOut }) => {
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      const onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
          whenSignIn();
        } else {
          whenSignOut();
        }
      };

      window.gapi.client.init({
        clientId: '1026008969674-urgnfp54da0a0rot6ggevesnehkqndas.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        const auth = window.gapi.auth2.getAuthInstance();
        setIsSignedIn(auth.isSignedIn.get());
        auth.isSignedIn.listen(onAuthChange);
      });
    });
  }, [whenSignIn, whenSignOut]);

  const makeSignIn = () => {
    const auth = window.gapi.auth2.getAuthInstance();
    auth.signIn();
    console.log('the user is signed in !');
  };

  const makeSignOut = () => {
    const auth = window.gapi.auth2.getAuthInstance();
    auth.signOut();
    console.log('the user is signed out !');
  };

  const renderLoginBtn = () => {
    switch(isSignedIn) {
      case null:
        return null;
      case true:
        return (
          <button
            className="ui red google button"
            onClick={makeSignOut}
          >
          <i className="google icon" />
            Sign Out
          </button>
        );
      default:
        return (
          <button
            className="ui red google button"
            onClick={makeSignIn}
          >
          <i className="google icon" />
            Sign In
          </button>
        );
    }
  };

  return(
    <div>
      {renderLoginBtn()}
    </div>
  );
};

export default connect(null, { whenSignIn, whenSignOut })(GoogleAuth);
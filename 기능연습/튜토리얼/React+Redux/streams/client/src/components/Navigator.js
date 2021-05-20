import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Navigator = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Streamer
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          All Streams
        </Link>
      </div>
      <GoogleAuth />
    </div>
  );
};

export default Navigator;
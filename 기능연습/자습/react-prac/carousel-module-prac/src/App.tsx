import React from 'react';
import Carousel from './Carousel';

export default function App() {
  return (
    <div
      id="outer_container"
      style={{
        border: '1px solid black',
        width: '800px',
        height: '600px'
      }}
    >
      <Carousel />
    </div>
  );
}
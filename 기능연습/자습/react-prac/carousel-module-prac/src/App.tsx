import React from 'react';
import Carousel from './Carousel';
import './style.css';
import foo from './data.json';

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
      <Carousel data={foo.colors}/>
    </div>
  );
}
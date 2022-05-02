import React, { useState, useEffect } from 'react';
import Carousel from './Carousel';
import './style.css';
import foo from './data.json';

export default function App() {
  const [mode, setMode] = useState<string>('button');
  useEffect(() => {
    // if (mode === 'button') {
    //   alert('button');
    // } else {
    //   alert('timer');
    // }
  }, [mode])
  return (
    <>
      <div
        id="outer_container"
        style={{
          border: '1px solid black',
          width: '800px',
          height: '600px'
        }}
      >
        <Carousel data={foo.colors} mode={mode} />
      </div>
      <button
        onClick={e => {
          if (mode === 'button') {
            setMode('timer')
          } else {
            setMode('button')
          }
        }}
      >모드 전환</button>
    </>
  );
}
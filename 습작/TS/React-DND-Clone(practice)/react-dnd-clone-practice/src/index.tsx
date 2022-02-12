import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import './styles/index.css';
import { observe } from './components/Game'

// ReactDOM.render(
//   <Board knightPosition={[0, 0]} />,
//   document.querySelector('#root')
// );
observe((knightPosition) => ReactDOM.render(
  <Board knightPosition={knightPosition} />,
  document.querySelector('#root')
))
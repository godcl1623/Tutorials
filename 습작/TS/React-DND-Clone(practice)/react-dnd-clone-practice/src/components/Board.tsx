import React from 'react';
import Knight from './Knight';
import Square from './Square';
import { moveKnight } from './Game'

// function renderSquare(i, [knightX, knightY]) {
//   const x = i % 8;
//   const y = Math.floor(i / 8);
//   const isKnightHere = x === knightX && y === knightY;
//   const black = (x + y) % 2 === 1;
//   const piece = isKnightHere ? <Knight /> : null;

//   return (
//     <div key={i} style={{ width: '12.5%', height: '12.5%'}}>
//       <Square black={black}>{ piece }</Square>
//     </div>
//   );
// }

// const Board = ({ knightPosition }) => {
//   const squares: JSX.Element[] = []
//   for (let i = 0; i < 64; i++) {
//     squares.push(renderSquare(i, knightPosition));
//   }

//   return (
//     <div
//       style={{
//         width: '100%',
//         height: '100%',
//         display: 'flex',
//         flexWrap: 'wrap'
//       }}
//     >
//       { squares }
//     </div>
//   );
// };

// export default Board;

function renderSquare(i, [knightX, knightY]) {
// function renderSquare(i, knightPosition) {
  const x = i % 8;
  const y = Math.floor(i / 8);
  const isKnightHere = x === knightX && y === knightY;
  const black = (x + y) % 2 === 1;
  const piece = isKnightHere ? <Knight /> : null;

  return (
    <div
      key={i}
      style={{
        width: '12.5%',
        height: '100px'
      }}
    >
      <Square black={black}>{piece}</Square>
    </div>
  );
}

const Board = ({ knightPosition }) => {
  const squares: JSX.Element[] = [];
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, knightPosition));
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap'
      }}
    >
      { squares }
    </div>
  )
}

export default Board;
import React from 'react';
import SongList from './SongList';
import { selectSongs } from '../actions';

const App = () => {
  return(
    <div>
      <SongList />
    </div>
  );
}

export default App;
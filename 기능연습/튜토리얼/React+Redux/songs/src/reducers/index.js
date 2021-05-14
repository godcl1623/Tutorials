import { combineReducers } from 'redux';

const songListReducer = () => {
  return [
    { title: 'Paper Cages', duration: '4:33' },
		{ title: 'Feel The Love Go', duration: '4:12' },
		{ title: 'No You Girls', duration: '3:42' },
		{ title: 'Take Me Out', duration: '3:50' }
  ];
};

const selectedSongReducer = (selectedSong = null, action) => {
  if (action.type === 'SONG_SELECTED') {
    return action.payload;
  }

  return selectedSong;
};

export default combineReducers({
  songs: songListReducer,
  selectedSong: selectedSongReducer
});
import React from 'react';
import { connect } from 'react-redux';

const SongList = () => {
  return (
    <div>
      <h1>SongList</h1>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { songs: state.songs };
};

export default connect(mapStateToProps)(SongList);
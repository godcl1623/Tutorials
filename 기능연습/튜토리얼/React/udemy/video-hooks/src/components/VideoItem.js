import React from 'react';
import './VideoItem.css'

const VideoItem = ({ info, onVideoSelect }) => {
  return(
    <div
      className="video-item item"
      onClick={() => onVideoSelect(info)}
    >
      <img className="ui image" src={info.snippet.thumbnails.medium.url} alt={info.snippet.title} />
      <div className="content">
        <div className="header">
          {info.snippet.title}
        </div>
      </div>
    </div>
  );
}

export default VideoItem;
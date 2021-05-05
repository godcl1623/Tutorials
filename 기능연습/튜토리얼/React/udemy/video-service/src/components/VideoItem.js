import React from 'react';
import './VideoItem.css'

const VideoItem = ({ info }) => {
  return(
    <div className="video-item item">
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
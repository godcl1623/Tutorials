import React from 'react';
import VideoItem from './VideoItem';

const VideoList = ({ videos }) => {
  const renderList = videos.map(video => {
    return <VideoItem key={video.id.videoId} info={video}/>;
  });
  return(
    <div className="ui relaxed divided list">
      { renderList }
    </div>
  );
}

export default VideoList;
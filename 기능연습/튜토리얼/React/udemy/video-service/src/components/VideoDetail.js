import React from 'react';

const VideoDetail = ({ video }) => {
  if (!video) {
    return <div>Search Videos !</div>
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

  console.log(video);
  return (
    <div>
      <div className="ui embed">
        <iframe title={video.snippet.title} src={videoSrc} />
      </div>
      <div className="ui segment">
        <h4 className="ui header">{video.snippet.title}</h4>
        <p>{video.snippet.description}</p>
      </div>
    </div>
  );
}

export default VideoDetail;
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import YoutubeAPI from '../api/YoutubeAPI';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(undefined);

  const onTermSubmit = async input => {
    const response = await YoutubeAPI.get('/search', {
      params: {
        q: input
      }
    });
    setVideos(response.data.items);
    setSelectedVideo(response.data.items[0]);
  };

  const onVideoSelect = selectedVid => {
    setSelectedVideo(selectedVid);
  };

  return(
    <div className="ui container">
      <SearchBar
        onFormSubmit={onTermSubmit}
      />
      검색 결과: {videos.length} 건
      <div className="ui grid">
        <div className="ui row">
          <div className="eleven wide column">
            <VideoDetail
              video={selectedVideo}
            />
          </div>
          <div className="five wide column">
            <VideoList 
              videos={videos}
              onVideoSelect={onVideoSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
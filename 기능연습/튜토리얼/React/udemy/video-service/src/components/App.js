import React from 'react';
import SearchBar from './SearchBar';
import YoutubeAPI from '../api/YoutubeAPI';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

class App extends React.Component {
  state={
    videos: [],
    selectedVideo: undefined
  }

  onTermSubmit = async input => {
    const response = await YoutubeAPI.get('/search', {
      params: {
        q: input
      }
    });
    this.setState({
      videos: response.data.items
    })
  };

  onVideoSelect = selectedVid => {
    this.setState({
      selectedVideo: selectedVid
    })
    console.log(this.state.selectedVideo);
  };

  render() {
    return(
      <div className="ui container">
        <SearchBar
          onFormSubmit={this.onTermSubmit}
        />
        검색 결과: {this.state.videos.length} 건
        <VideoDetail
          video={this.state.selectedVideo}
        />
        <VideoList 
          videos={this.state.videos}
          onVideoSelect={this.onVideoSelect}
        />
      </div>
    );
  }
}

export default App;
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
      videos: response.data.items,
      selectedVideo: response.data.items[0]
    })
  };

  onVideoSelect = selectedVid => {
    this.setState({
      selectedVideo: selectedVid
    })
  };

  render() {
    return(
      <div className="ui container">
        <SearchBar
          onFormSubmit={this.onTermSubmit}
        />
        검색 결과: {this.state.videos.length} 건
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail
                video={this.state.selectedVideo}
              />
            </div>
            <div className="five wide column">
              <VideoList 
                videos={this.state.videos}
                onVideoSelect={this.onVideoSelect}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
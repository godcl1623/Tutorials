import React from 'react';
import SearchBar from './SearchBar';
import YoutubeAPI from '../api/YoutubeAPI';

class App extends React.Component {
  state={ videos: [] }
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
  render() {
    return(
      <div className="ui container">
        <SearchBar
          onFormSubmit={this.onTermSubmit}
        />
        검색 결과: {this.state.videos.length} 건
      </div>
    );
  }
}

export default App;
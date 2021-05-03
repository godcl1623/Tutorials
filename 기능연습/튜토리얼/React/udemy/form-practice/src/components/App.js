import React from 'react';
import unsplash from '../api/unsplash';
import SearchBar from './SearchBar';
import ImageList from './ImageList';

// const App = () => {
//   return (

//   );
// };
class App extends React.Component {
  state={ image: [] };

  onSearchSubmit = async term => {
    const response = await unsplash.get('/search/photos', {
      params: { query: term }
    });
    this.setState({ image: response.data.results });
    console.log(this.state.image);
  }
  render() {
    return (
      <div
        className="ui container"
        style={{marginTop: '10px'}}
      >
        <SearchBar
          onSubmit={this.onSearchSubmit}
        />
        {/* Found: {this.state.image.length} images. */}
        <ImageList queryResult={this.state.image} />
      </div>
    );
  }
}

export default App;
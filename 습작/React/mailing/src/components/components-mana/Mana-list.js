import React, { Component } from 'react'

class NewsList extends Component {
  constructor(props) {
    super(props);
    this.newsList = JSON.parse(localStorage.getItem('NewsList'));
    this.state = {
      headline: '',
      newsInput: ''
    }
  }

  displayNews = (e) => {
    this.newsList.forEach(element => {
      if (element.headline === e.target.textContent || element.newsInput === e.target.textContent) {
        this.setState({
          headline: e.target.parentNode.childNodes[0].textContent,
          newsInput: e.target.parentNode.childNodes[1].textContent
        })
      }
    })
  }

  displayNewsList = () => {
    return this.newsList.map((element, index) => {
      return(
          <tr
            key={index}
            onClick={(e) => this.displayNews(e)}
          >
            <td>{element.headline}</td>
            <td>{element.newsInput}</td>
          </tr>
      );
    });
  };

  render() {
    // console.log(this.displayNewsList());
    return(
      <div className="management-list">
        <h1>News List</h1>
        <table>
          <thead>
            <tr>
              <th>제목</th>
              <th>내용</th>
            </tr>
          </thead>
          <tbody>
            {this.displayNewsList()}
          </tbody>
        </table>
        <form>
          <input
            type="text"
            name="headline"
            id="headline"
            value={this.state.headline}
            onChange={() => {}}
          />
          <textarea
            name="news-input"
            id="news-input"
            value={this.state.newsInput}
            onChange={() => {}}
          />
        </form>
      </div>
    );
  }
}

export default NewsList;
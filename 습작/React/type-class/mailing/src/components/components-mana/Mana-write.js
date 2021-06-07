import React, { Component } from 'react'

class WriteNews extends Component {
  sendToStorage = data => {
    const formValue = JSON.parse(localStorage.getItem('NewsList')) || [];
    formValue.push(data);
    localStorage.setItem('NewsList', JSON.stringify(formValue));
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.target);
    const value = {
      headline: data.get('headline'),
      newsInput: data.get('news-input')
    }
    this.sendToStorage(value);
    event.target.reset();
  }
  render() {
    return(
      <div className="management-write">
        <h1>뉴스작성</h1>
        <form
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            name="headline"
            placeholder="제목"
          />
          <textarea
            name="news-input"
            placeholder="내용"
          />
          <input
            type="submit"
          />
        </form>
      </div>
    );
  }
}

export default WriteNews;
import React, { Component } from 'react';
import './App.css';
import Modal from './Component/Modal'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postInfo: [
        {id: 1, title: '일산 고기 맛집', date: '2월 13일 발행'},
        {id: 2, title: '남자 코트 추천', date: '3월 27일 발행'},
        {id: 3, title: '더 만달로리안 시즌3 리뷰', date: '4월 30일 발행'},
      ],
      count: 0,
      selectedId: 1,
      show: false
    }
  }
  showModal = () => {
    this.setState({show: true})
  }
  closeModal = () => {
    this.setState({show: false})
  }
  openModal = event => {
    event.preventDefault();
    this.setState({
      selectedId: Number(event.target.dataset.id)
    })
    this.showModal();
    // console.log(this.state.show)
  }
  pickSelected = () => {
    const newArray = Array.from(this.state.postInfo);
    const chosenOne = newArray.find(element => element.id === this.state.selectedId);
    return chosenOne;
  }
  render() {
    return(
      <div id="root">
        <nav className="black-nav">
          <span>개발 Blog</span>
        </nav>
        <article className="post-box">
          <h3>
            <a
              href="/"
              data-id="1"
              onClick={this.openModal}
            >
              { this.state.postInfo[0].title }
            </a>
            <span
              onClick={() => {
                let _count = this.state.count;
                _count++;
                this.setState({
                  count: _count
                })
              }}
            >
              👍
            </span>
            {this.state.count}
          </h3>
          <span>{ this.state.postInfo[0].date }</span>
        </article>
        <article className="post-box">
          <h3>
            <a
              href="/"
              data-id="2"
              onClick={this.openModal}
            >
              { this.state.postInfo[1].title }
            </a>
            <button
              onClick={() => {
                const newInfo = Array.from(this.state.postInfo);
                newInfo[1] = {id: 2, title: '여자 코트 추천', date: '3월 27일 발행'}
                this.setState({
                  postInfo: newInfo
                })
              }}
            >
              변경
            </button>
          </h3>
          <span>{ this.state.postInfo[1].date }</span>
        </article>
        <article className="post-box">
          <h3>
            <a
              href="/"
              data-id="3"
              onClick={this.openModal}
            >
            { this.state.postInfo[2].title }
            </a>
          </h3>
          <span>{ this.state.postInfo[2].date }</span>
        </article>
        <Modal
          data={this.pickSelected()}
          state={this.state.show}
          close={this.closeModal}
        />
      </div>
    );
  }
}

export default App;

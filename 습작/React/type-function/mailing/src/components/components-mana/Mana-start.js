import React, { Component } from 'react'

class ManageMain extends Component {
  constructor(props) {
    super(props);
    this.memberNum = JSON.parse(localStorage.getItem('localFormValue'));
  }

  render() {
    return(
      <div className="management-start">
        <h1>Management Main</h1>
        <h2>회원 수: {this.memberNum.length}</h2>
        <h2>작성 뉴스 수</h2>
      </div>
    );
  }
}

export default ManageMain;
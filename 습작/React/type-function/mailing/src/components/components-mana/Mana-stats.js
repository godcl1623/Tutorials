import React, { Component } from 'react'

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.memberList = JSON.parse(localStorage.getItem('localFormValue'));
    this.gender = genderInput => {
      return this.memberList.filter(element => element.gender === genderInput).length;
    };
    this.source = sourceId => {
      return this.memberList.filter(element => element.source[element.source.length - 2] === String(sourceId)).length;
    };
    this.interests = () => {
      const interests = this.memberList.reduce((obj, item) => {
        for(let i = 0; i < item.interests.length; i++) {
          if (!obj[item.interests[i]]) {
            obj[item.interests[i]] = 0;
          }
          obj[item.interests[i]]++;
        }
        return obj;
      }, {});

      return Object.keys(interests)
        .sort((a, b) => {
          return parseFloat(a[a.length - 1]) < parseFloat(b[b.length - 1]) ? -1 : 1;
        })
        .map((element, index) => {
          return(
            <td key={index}>{element}: {interests[element]}</td>
          );
        });
    };
    this.favorite = () => {
      const favorite = this.memberList.map(element => {
        return element.favorite;
      })
      .reduce((obj, item) => {
        if (!obj[item]) {
          obj[item] = 0;
        }
        obj[item]++;
        return obj;
      }, {})
      const result = Object.keys(favorite)
        .sort((a, b) => {
          return (a.split(' ')[0] > b.split(' ')[0]) &&
            (parseFloat(a.split(' ')[1].replace('시', '')) > parseFloat(b.split(' ')[1].replace('시', ''))) ? -1 : 1;
        })
        .map((element, index) => {
          // return console.log(element)
          return(
            <td key={index}>{element}: {favorite[element]}</td>
          );
        });
      return result;
    };
  }

  displayList = target => {
    return target.map((element, i) => {
      return(
        <tbody>
          <tr key={i}>
            <td>{element.family}{element.name}</td>
            <td>{element.gender}</td>
            <td>{element.email}</td>
          </tr>
        </tbody>
      );
    });
  };
  render() {
    console.log(this.favorite())
    // console.log(Object.keys(this.favorite()))
    return(
      <div className="management-stat">
        <h1>Statistics</h1>
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>성별</th>
              <th>이메일</th>
            </tr>
          </thead>
            {this.displayList(this.memberList)}
        </table>
        <table>
          <tbody>
            <tr>
              <th>성별 통계</th>
              <td>남:{this.gender('남')}</td>
              <td>여:{this.gender('여')}</td>
              <td>비공개:{this.gender('비공개')}</td>
            </tr>
            <tr>
              <th>가입 경로</th>
              <td>경로 1: {this.source(1)}</td>
              <td>경로 2: {this.source(2)}</td>
              <td>경로 3: {this.source(3)}</td>
            </tr>
            <tr>
              <th>관심사</th>
              {this.interests()}
            </tr>
            <tr>
              <th>희망시간</th>
              {this.favorite()}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Statistics;
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { memberlist } from '../../actions';

const Statistics = ({ members, memberlist }) => {
  useEffect(() => {
    fetch('http://localhost:3001/member/get')
      .then(blob => blob.json())
      .then(data => memberlist(data));
    if (members.length === 0) return;
    console.log(members);
  }, [memberlist]);

  const gender = genderInput => {
    return members.filter(element => element.gender === genderInput).length;
  };

  const source = sourceId => {
    return members.filter(element => element.source[element.source.length - 2] === String(sourceId))
      .length;
  };

  const interests = () => {
    const interests = members.reduce((obj, item) => {
      for (let i = 0; i < item.interests.length; i++) {
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
        return (
          <td key={index}>
            {element}: {interests[element]}
          </td>
        );
      });
  };

  const favorite = () => {
    const favorite = members
      .map(element => {
        return element.favorite;
      })
      .reduce((obj, item) => {
        if (!obj[item]) {
          obj[item] = 0;
        }
        obj[item]++;
        return obj;
      }, {});
    const result = Object.keys(favorite)
      .sort((a, b) => {
        return a.split(' ')[0] > b.split(' ')[0] &&
          parseFloat(a.split(' ')[1].replace('시', '')) >
            parseFloat(b.split(' ')[1].replace('시', ''))
          ? -1
          : 1;
      })
      .map((element, index) => {
        // return console.log(element)
        return (
          <td key={index}>
            {element}: {favorite[element]}
          </td>
        );
      });
    return result;
  };

  const displayList = target => {
    return target.map((element, i) => {
      return (
        <tbody key={i}>
          <tr>
            <td>
              {element.family}
              {element.name}
            </td>
            <td>{element.gender}</td>
            <td>{element.email}</td>
          </tr>
        </tbody>
      );
    });
  };

  // console.log(favorite())
  // console.log(Object.keys(favorite()))
  return (
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
        {displayList(members)}
      </table>
      <table>
        <tbody>
          <tr>
            <th>성별 통계</th>
            <td>남:{gender('남성')}</td>
            <td>여:{gender('여성')}</td>
            <td>비공개:{gender('비공개')}</td>
          </tr>
          <tr>
            <th>가입 경로</th>
            <td>경로 1: {source(1)}</td>
            <td>경로 2: {source(2)}</td>
            <td>경로 3: {source(3)}</td>
          </tr>
          <tr>
            <th>관심사</th>
            {interests()}
          </tr>
          <tr>
            <th>희망시간</th>
            {favorite()}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = state => {
  return { members: state.memberList };
};

export default connect(mapStateToProps, { memberlist })(Statistics);

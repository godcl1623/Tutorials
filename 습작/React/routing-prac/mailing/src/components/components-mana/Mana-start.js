import React from 'react';

const ManageMain = () => {
  const memberNum = JSON.parse(localStorage.getItem('localFormValue'));

  return (
    <div className="management-start">
      <h1>Management Main</h1>
      <h2>회원 수: {memberNum.length}</h2>
      <h2>작성 뉴스 수</h2>
    </div>
  );
};

export default ManageMain;

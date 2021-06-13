import React from 'react';
import CommonForm from '../common';
import '../styles/Main-form.css';

const DataUpdate = props => {
  return <CommonForm memberId={props.match.params.id} />;
};

export default DataUpdate;

import React from 'react';
import { connect } from 'react-redux';
import { createStreams } from '../../actions';
import StreamForm from './StreamForm';

const StreamCreate = ({ createStreams }) => {
  const newStream = (formValues) => {
    createStreams(formValues);
  };

  return (
    <div>
      <h3>새 방송</h3>
      <StreamForm onSubmitData={newStream} />
    </div>
  );
};

export default connect(null, { createStreams })(StreamCreate);
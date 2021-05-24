import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

const StreamList = ({ fetchStreams }) => {
  useEffect(() => {
    fetchStreams();
  }, [fetchStreams]);
  return (
    <div>
      <h1>StreamList</h1>
    </div>
  );
};

export default connect(null, { fetchStreams })(StreamList);
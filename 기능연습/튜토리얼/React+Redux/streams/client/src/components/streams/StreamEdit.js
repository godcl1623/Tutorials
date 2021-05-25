import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

const StreamEdit = ({ match, stream, fetchStreams }) => {
  useEffect(() => {
    fetchStreams(match.params.id);
  }, [fetchStreams, match.params.id]);

  if (!stream) {
    return <div><h1>Loading...</h1></div>;
  } else {
    return (
      <div>
        {stream.title}
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchStreams })(StreamEdit);
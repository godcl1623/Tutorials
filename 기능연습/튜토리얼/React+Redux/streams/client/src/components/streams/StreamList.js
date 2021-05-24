import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

const StreamList = ({ fetchStreams, streams, currentUserId, isSignedIn }) => {
  useEffect(() => {
    fetchStreams();
  }, [fetchStreams]);

  const modifyMyStream = stream => {
    if (stream.userId === currentUserId) {
      return (
        <div className="right floated content">
          <button className="ui button primary">
            편집
          </button>
          <button className="ui button negative">
            삭제
          </button>
        </div>
      );
    }
  }

  const renderList = () => {
    return streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {modifyMyStream(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            {stream.title}
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  };

  const renderCreate = () => {
    if (isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui button positive">
            스트리밍 시작
          </Link>
        </div>
      );
    }
  }

  return (
    <div>
      <h2>Streams List</h2>
      <div className="ui celled list">{renderList()}</div>
      {renderCreate()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);
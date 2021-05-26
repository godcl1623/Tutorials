import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAStream, deleteStream } from '../../actions';
import Modal from '../Modal';
import history from '../../history';

const StreamDelete = ({ match, stream, fetchAStream, deleteStream }) => {
  useEffect(() => {
    fetchAStream(match.params.id);
  }, [fetchAStream, match.params.id]);

  const modalActions = (
    <>
      <button
        className="ui negative button"
        onClick={() => deleteStream(match.params.id)}
      >
        삭제
      </button>
      <Link to="/" className="ui button">취소</Link>
    </>
  );

  return (
      <Modal
        title="경고"
        content={`선택하신 방송(${!stream ? '' : stream.title})을 삭제하시겠습니까?`}
        actions={modalActions}
        onDismiss={() => history.push('/')}
      />
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchAStream, deleteStream })(StreamDelete);
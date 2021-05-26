import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAStream } from '../../actions';
import Modal from '../Modal';
import history from '../../history';

const StreamDelete = ({ match, stream, fetchAStream }) => {
  useEffect(() => {
    fetchAStream(match.params.id);
  }, [fetchAStream, match.params.id]);

  const modalActions = (
    <>
      <button className="ui negative button">삭제</button>
      <button className="ui button">취소</button>
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

export default connect(mapStateToProps, { fetchAStream })(StreamDelete);
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStreams, editStream } from '../../actions';
import StreamForm from './StreamForm';

const StreamEdit = ({ match, stream, fetchStreams, editStream }) => {
  useEffect(() => {
    fetchStreams(match.params.id);
  }, [fetchStreams, match.params.id]);

  const onEditStream = formValues => {
    editStream(match.params.id, formValues);
  }

  if (!stream) {
    return <div><h1>Loading...</h1></div>;
  } else {
    return (
      <div>
        <h3>방송 편집</h3>
        <StreamForm
          initialValues={{title: stream.title, description: stream.description}}
          onSubmitData={onEditStream}
        />
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchStreams, editStream })(StreamEdit);
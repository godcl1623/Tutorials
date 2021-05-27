import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAStream } from '../../actions';

const StreamShow = ({ fetchAStream, match, ...props }) => {
  useEffect(() => {
    fetchAStream(match.params.id);
  }, [fetchAStream, match.params.id]);

  const { title, description} = props.stream;

  if (!props.stream) {
    return <div><h1>Loading...</h1></div>;
  }
  return (
    <div>
      <h1>{title}</h1>
      <h5>{description}</h5>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchAStream })(StreamShow);
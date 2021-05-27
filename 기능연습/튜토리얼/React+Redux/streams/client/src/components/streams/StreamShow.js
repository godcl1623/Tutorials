import React, { useEffect } from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchAStream } from '../../actions';

const StreamShow = ({ fetchAStream, match, stream, ...props }) => {

  const videoRef = React.createRef();

  useEffect(() => {
    fetchAStream(match.params.id);
    const buildPlayer = () => {
      const player = flv.createPlayer({
        type: 'flv',
        url: `http://localhost:8000/live/${match.params.id}.flv`
      });
      if (player || !stream) {
        return;
      }
      player.attachMediaElement(videoRef.current);
      player.load();
    };
    buildPlayer();
  }, [fetchAStream, match.params.id, stream, videoRef]);

  if (!stream) {
    return <div><h1>Loading...</h1></div>;
  }
  return (
    <div>
      <video ref={videoRef} style={{width: '100%'}} controls />
      <h1>{stream.title}</h1>
      <h5>{stream.description}</h5>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchAStream })(StreamShow);
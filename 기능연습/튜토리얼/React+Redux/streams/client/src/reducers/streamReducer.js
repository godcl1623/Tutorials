const streamReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_A_STREAM':
      return { ...state, [action.payload.id]: action.payload };
    case 'EDIT_STREAM':
      return { ...state, [action.payload.id]: action.payload };
    case 'CREATE_STREAM':
      return { ...state, [action.payload.id]: action.payload };
    case 'DELETE_STREAM':
      const tempState = { ...state };
      delete tempState[action.payload.id];
      return tempState;
    case 'FETCH_STREAMS':
      const tempState2 = {};
      action.payload.forEach(stream => {
        tempState2[stream.id] = stream;
      });
      return {...state, ...tempState2};
    default:
      return state;
  }
};

export default streamReducer;
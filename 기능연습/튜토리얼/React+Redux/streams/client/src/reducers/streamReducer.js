import _ from 'lodash';

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
      // const { [action.payload.id]: omit, ...newState} = state;
      // return newState;
      delete tempState[action.payload.id];
      return tempState;
      // return _.omit(state, action.payload);
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
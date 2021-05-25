import streams from '../api/streams';
import history from '../history';

export const whenSignIn = (userId) => {
  return {
    type: 'SIGN_IN',
    payload: userId
  }
}

export const whenSignOut = () => {
  return {
    type: 'SIGN_OUT'
  }
}

export const createStreams = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post('/streams', {...formValues, userId});
  dispatch({type: 'CREATE_STREAM', payload: response.data});
  history.push('/');
}

export const fetchStreams = () => async dispatch => {
  const response = await streams.get('/streams');
  dispatch({type: 'FETCH_STREAMS', payload: response.data});
}

export const fetchAStream = id => async dispatch => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({type: 'FETCH_A_STREAM', payload: response.data});
}

export const editStream = (id, formValue) => async dispatch => {
  const response = await streams.put(`/streams/${id}`, formValue);
  dispatch({type: 'EDIT_STREAM', payload: response.data});
}

export const deleteStream = id => async dispatch => {
  const response = await streams.delete(`/streams/${id}`);
  dispatch({type: 'DELETE_STREAM', payload: response.data});
}
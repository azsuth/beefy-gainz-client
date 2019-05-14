import { setIdToken } from 'service/api/apiConfig';

import {
  LOGIN_STATE,
  LOGIN_STATE_CHANGED,
  LOGIN_FAILURE
} from 'constants/index';

export const notLoggedIn = () => ({
  type: LOGIN_STATE_CHANGED,
  payload: LOGIN_STATE.NOT_LOGGED_IN
});

export const loggingIn = () => ({
  type: LOGIN_STATE_CHANGED,
  payload: LOGIN_STATE.LOGGING_IN
});

export const loggedIn = (authResponse, history) => dispatch => {
  setIdToken(authResponse.tokenId);

  dispatch({
    type: LOGIN_STATE_CHANGED,
    payload: LOGIN_STATE.LOGGED_IN
  });

  history.push('/exercises');
};

export const loginFailure = err => ({
  type: LOGIN_FAILURE,
  payload: err
});

import { LOGIN_STATE, LOGIN_STATE_CHANGED } from 'constants/index';

const INITIAL_STATE = {
  loginState: LOGIN_STATE.LOADING
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_STATE_CHANGED:
      return { ...state, loginState: action.payload };
    default:
      return state;
  }
};

import { combineReducers } from 'redux';

import Exercise from 'reducer/Exercise';
import Auth from 'reducer/Auth';

export default combineReducers({
  Exercise,
  Auth
});

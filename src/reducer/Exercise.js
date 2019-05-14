import { NEW_EXERCISES } from 'constants/index';

const INITIAL_STATE = {
  exercises: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEW_EXERCISES:
      return { ...state, exercises: action.payload };
    default:
      return state;
  }
};

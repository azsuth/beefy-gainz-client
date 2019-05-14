import {
  NEW_EXERCISES,
  EXERCISE_FOCUSSED,
  EXERCISE_NAME_CHANGED,
  NEW_SEARCH_EXERCISES,
  CANCEL_EXERCISE_SEARCH
} from 'constants/index';

const INITIAL_STATE = {
  exercises: [],
  exerciseFocussed: false,
  exerciseName: '',
  searchExercises: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEW_EXERCISES:
      return { ...state, exercises: action.payload };
    case EXERCISE_FOCUSSED:
      return { ...state, exerciseFocussed: action.payload };
    case EXERCISE_NAME_CHANGED:
      return { ...state, exerciseName: action.payload };
    case NEW_SEARCH_EXERCISES:
      return { ...state, searchExercises: action.payload };
    case CANCEL_EXERCISE_SEARCH:
      return {
        ...state,
        exerciseFocussed: false,
        exerciseName: '',
        searchExercises: []
      };
    default:
      return state;
  }
};

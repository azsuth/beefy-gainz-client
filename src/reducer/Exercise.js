import {
  NEW_EXERCISES,
  EXERCISE_FOCUSSED,
  EXERCISE_NAME_CHANGED,
  NEW_SEARCH_EXERCISES,
  CANCEL_EXERCISE_SEARCH,
  LOADING_SEARCH_RESULTS,
  CLEAR_SEARCH_RESULTS,
  LOADING_EXERCISES,
  EDIT_SET,
  EDIT_EXERCISE
} from 'constants/index';

const INITIAL_STATE = {
  exercises: [],
  exerciseFocussed: false,
  exerciseName: '',
  searchExercises: [],
  loadingSearchResults: false,
  loadingExercises: false,
  editingSets: {},
  editingExercises: {}
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
    case LOADING_SEARCH_RESULTS:
      return {
        ...state,
        loadingSearchResults: action.payload
      };
    case CLEAR_SEARCH_RESULTS:
      return { ...state, searchExercises: [] };
    case LOADING_EXERCISES:
      return { ...state, loadingExercises: action.payload };
    case EDIT_SET:
      return {
        ...state,
        editingSets: {
          ...state.editingSets,
          [action.payload.setId]: action.payload.editing
        }
      };
    case EDIT_EXERCISE:
      return {
        ...state,
        editingExercises: {
          ...state.editingExercises,
          [action.payload.exerciseId]: action.payload.editing
        }
      };
    default:
      return state;
  }
};

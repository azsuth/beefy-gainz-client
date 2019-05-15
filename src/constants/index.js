/* ----- LOGIN CONSTANTS ----- */

export const LOGIN_STATE = {
  LOADING: 'loading',
  STILL_LOADING: 'still_loading',
  LOGGING_IN: 'logging_in',
  NOT_LOGGED_IN: 'not_logged_in',
  LOGGED_IN: 'logged_in',
  LOGIN_FAILURE: 'login_failure'
};

// Login action types
export const LOGIN_STATE_CHANGED = 'login_state_changed';
export const LOGIN_FAILURE = 'login_failure';

/* ----- EXERCISE CONSTANTS ----- */

export const NEW_EXERCISE_ID = '29df5bde-be6d-421d-b1e9-f210cf8a946a';

// Exercise action types
export const LOADING_EXERCISES = 'loading_exercises';
export const NEW_EXERCISES = 'new_exercises';
export const EXERCISE_FOCUSSED = 'exercise_focussed';
export const EXERCISE_NAME_CHANGED = 'exercise_name_changed';
export const NEW_SEARCH_EXERCISES = 'new_search_exercises';
export const CANCEL_EXERCISE_SEARCH = 'cancel_exercise_search';
export const LOADING_SEARCH_RESULTS = 'loading_search_results';
export const CLEAR_SEARCH_RESULTS = 'clear_search_results';
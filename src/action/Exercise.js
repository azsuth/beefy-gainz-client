import { getCurrentExercisesService } from 'service/api/exercise';
import Exercise from 'model/Exercise';

import {
  NEW_EXERCISES,
  EXERCISE_FOCUSSED,
  EXERCISE_NAME_CHANGED,
  NEW_EXERCISE_ID,
  NEW_SEARCH_EXERCISES,
  CANCEL_EXERCISE_SEARCH
} from 'constants/index';

export const getExercises = () => dispatch => {
  getCurrentExercisesService().then(exercises => {
    dispatch({
      type: NEW_EXERCISES,
      payload: exercises
    });
  });
};

export const exerciseChangedFocus = focussed => ({
  type: EXERCISE_FOCUSSED,
  payload: focussed
});

export const exerciseNameChanged = exercise => (dispatch, getState) => {
  dispatch({
    type: EXERCISE_NAME_CHANGED,
    payload: exercise
  });

  if (exercise.length < 3) {
    return;
  }

  let exercises = [];
  getState().Exercise.exercises.forEach(exercise => {
    exercises.push(exercise);
  });

  // setTimeout(() => {
    exercises.push(new Exercise({
      id: NEW_EXERCISE_ID,
      name: exercise
    }));

    dispatch({
      type: NEW_SEARCH_EXERCISES,
      payload: exercises
    });
  // }, 500);
};

export const cancelExerciseSearch = () => ({
  type: CANCEL_EXERCISE_SEARCH
});

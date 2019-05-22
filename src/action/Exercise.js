import find from 'lodash/find';

import {
  getCurrentExercisesService,
  searchExercisesService,
  createExerciseService,
  updateExerciseService,
  updateSetService
} from 'service/api/exercise';
import Exercise from 'model/Exercise';

import {
  NEW_EXERCISES,
  EXERCISE_FOCUSSED,
  EXERCISE_NAME_CHANGED,
  NEW_EXERCISE_ID,
  NEW_SEARCH_EXERCISES,
  CANCEL_EXERCISE_SEARCH,
  LOADING_SEARCH_RESULTS,
  CLEAR_SEARCH_RESULTS,
  LOADING_EXERCISES,
  EDIT_SET
} from 'constants/index';

export const getExercises = () => dispatch => {
  dispatch({
    type: LOADING_EXERCISES,
    payload: true
  });

  getCurrentExercisesService().then(exercises => {
    dispatch({
      type: LOADING_EXERCISES,
      payload: false
    });
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

export const exerciseNameChanged = exercise => dispatch => {
  dispatch({
    type: EXERCISE_NAME_CHANGED,
    payload: exercise
  });

  if (exercise.length < 3) {
    dispatch({
      type: CLEAR_SEARCH_RESULTS
    });

    return;
  }

  dispatch({
    type: LOADING_SEARCH_RESULTS,
    payload: true
  });

  searchExercisesService(exercise).then(exercises => {
    dispatch({
      type: LOADING_SEARCH_RESULTS,
      payload: false
    });

    exercises.push(
      new Exercise({
        id: NEW_EXERCISE_ID,
        name: exercise
      })
    );

    dispatch({
      type: NEW_SEARCH_EXERCISES,
      payload: exercises
    });
  });
};

export const cancelExerciseSearch = () => ({
  type: CANCEL_EXERCISE_SEARCH
});

export const logNewExercise = exercise => dispatch => {
  if (exercise.id === NEW_EXERCISE_ID) {
    dispatch(createNewExercise(exercise));
  } else {
    dispatch(logNewSetForExercise(exercise));
  }
};

export const createNewExercise = exercise => dispatch => {
  dispatch({
    type: LOADING_EXERCISES,
    payload: true
  });
  dispatch(cancelExerciseSearch());

  createExerciseService({ name: exercise.name }).then(() => {
    dispatch(getExercises());
  });
};

export const updateExercise = exercise => dispatch => {
  dispatch({
    type: LOADING_EXERCISES,
    payload: true
  });

  updateExerciseService(exercise.exercise).then(() => {
    dispatch(getExercises());
  });
};

export const logNewSetForExercise = exercise => dispatch => {};

export const editSet = (set, exerciseId, editing) => dispatch => {
  if (!editing) {
    updateSetService(set, exerciseId);
  }

  dispatch({
    type: EDIT_SET,
    payload: { setId: set.id, editing }
  });
};

export const setChanged = (
  setId,
  updatedValues,
  exerciseId,
  exercises
) => dispatch => {
  const { reps, lbs } = updatedValues;

  const exercise = find(exercises, { id: exerciseId });
  const set = find(exercise.sets, { id: setId });

  set.reps = reps || set.reps;
  set.lbs = lbs || set.lbs;

  dispatch({
    type: NEW_EXERCISES,
    payload: [...exercises]
  });
};

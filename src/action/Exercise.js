import find from 'lodash/find';

import {
  getCurrentExercisesService,
  searchExercisesService,
  createExerciseService,
  updateExerciseService,
  updateSetService,
  createSetService,
  deleteSetService,
  deleteExerciseService
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
  EDIT_SET,
  EDIT_EXERCISE
} from 'constants/index';

export const getExercises = (then = () => {}) => dispatch => {
  dispatch({
    type: LOADING_EXERCISES,
    payload: true
  });

  getCurrentExercisesService()
    .then(exercises => {
      dispatch({
        type: LOADING_EXERCISES,
        payload: false
      });
      dispatch({
        type: NEW_EXERCISES,
        payload: exercises
      });
    })
    .then(then);
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
  dispatch(cancelExerciseSearch());

  if (exercise.id === NEW_EXERCISE_ID) {
    dispatch(createNewExercise(exercise));
  } else {
    dispatch(logNewSet(exercise.id));
  }
};

export const createNewExercise = exercise => dispatch => {
  dispatch({
    type: LOADING_EXERCISES,
    payload: true
  });
  dispatch(cancelExerciseSearch());

  createExerciseService({ name: exercise.name }).then(exercise => {
    dispatch(
      getExercises(() => {

        /**
         * 
         * WARNING!!
         * 
         * The logic below works on the assumption that a new exercise
         * is always created with a default, 0 reps/0 lbs set. If that
         * ever changes then this logic will be broken.
         * 
         */

         dispatch(editSet(exercise.sets[0], exercise.id, true));
      })
    );
  });
};

export const updateExercise = exercise => dispatch => {
  dispatch({
    type: LOADING_EXERCISES,
    payload: true
  });

  updateExerciseService(exercise.obj).then(() => {
    dispatch(getExercises());
  });
};

export const logNewSet = exerciseId => dispatch => {
  dispatch({
    type: LOADING_EXERCISES,
    payload: true
  });

  createSetService(exerciseId).then(set => {
    dispatch(
      getExercises(() => {
        dispatch(editSet(set, exerciseId, true));
      })
    );
  });
};

export const editSet = (set, exerciseId, editing) => dispatch => {
  if (!editing) {
    updateSetService(set, exerciseId);
  }

  dispatch({
    type: EDIT_SET,
    payload: { setId: set.id, editing }
  });
};

export const editExercise = (exercise, editing) => dispatch => {
  if (!editing) {
    if (!exercise.name) {
      return;
    }

    updateExerciseService(exercise.obj);
  }

  dispatch({
    type: EDIT_EXERCISE,
    payload: { exerciseId: exercise.id, editing }
  });
};

export const setChanged = (
  setId,
  updatedValues,
  exerciseId,
  exercises
) => dispatch => {
  const exercise = find(exercises, { id: exerciseId });
  const set = find(exercise.sets, { id: setId });

  set.reps = 'reps' in updatedValues ? updatedValues.reps : set.reps;
  set.lbs = 'lbs' in updatedValues ? updatedValues.lbs : set.lbs;

  if (!set.reps) {
    set.reps = 0;
  } else if (set.reps.length > 1 && set.reps.startsWith('0')) {
    set.reps = parseInt(set.reps.slice(1));
  }

  if (!set.lbs) {
    set.lbs = 0;
  } else if (set.lbs.length > 1 && set.lbs.startsWith('0')) {
    set.lbs = parseInt(set.lbs.slice(1));
  }

  dispatch({
    type: NEW_EXERCISES,
    payload: [...exercises]
  });
};

export const exerciseChanged = (
  exerciseId,
  updatedValues,
  exercises
) => dispatch => {
  const exercise = find(exercises, { id: exerciseId });

  exercise.name = 'name' in updatedValues ? updatedValues.name : exercise.name;

  dispatch({
    type: NEW_EXERCISES,
    payload: [...exercises]
  });
};

export const deleteSet = (setId, exerciseId) => dispatch => {
  dispatch({
    type: LOADING_EXERCISES,
    payload: true
  });

  deleteSetService(setId, exerciseId).then(() => {
    dispatch(getExercises());
  });
};

export const deleteExercise = exerciseId => dispatch => {
  dispatch({
    type: LOADING_EXERCISES,
    payload: true
  });

  deleteExerciseService(exerciseId).then(() => {
    dispatch(getExercises());
  });
};

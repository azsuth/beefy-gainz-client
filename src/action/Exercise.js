import { getExercisesService } from 'service/api/exercise';
import { NEW_EXERCISES } from 'constants/index';

export const getExercises = () => (dispatch) => {
  getExercisesService().then(exercises => {
    dispatch({
      type: NEW_EXERCISES,
      payload: exercises
    });
  });
};

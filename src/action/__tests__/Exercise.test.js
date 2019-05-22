jest.mock('service/api/exercise');
import { searchExercisesService } from 'service/api/exercise';

import { exerciseNameChanged, setChanged } from 'action/Exercise';

import {
  EXERCISE_NAME_CHANGED,
  CLEAR_SEARCH_RESULTS,
  LOADING_SEARCH_RESULTS,
  NEW_SEARCH_EXERCISES,
  NEW_EXERCISE_ID,
  NEW_EXERCISES
} from 'constants/index';

import Exercise from 'model/Exercise';

describe('the exercise name changed function', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();

    searchExercisesService.mockResolvedValue([
      {
        id: 'an_exercise_id',
        name: 'an exercise name'
      }
    ]);
  });

  it('should dispatch the name changed action', () => {
    exerciseNameChanged('as')(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);

    const dispatchedAction = dispatch.mock.calls[0][0];

    expect(dispatchedAction.type).toBe(EXERCISE_NAME_CHANGED);
    expect(dispatchedAction.payload).toBe('as');
  });

  it('should dispatch the clear search results action when the search term is less than three chars', () => {
    exerciseNameChanged('as')(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);

    const dispatchedAction = dispatch.mock.calls[1][0];

    expect(dispatchedAction.type).toBe(CLEAR_SEARCH_RESULTS);
  });

  it('should NOT dispatch the loading search results action when the search term is less than three chars', () => {
    exerciseNameChanged('as')(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);

    for (let i = 0; i < 2; i++) {
      const dispatchedAction = dispatch.mock.calls[i][0];

      expect(dispatchedAction.type).not.toBe(LOADING_SEARCH_RESULTS);
    }
  });

  it('should dispatch the loading search results action when the search term is 3 or more chars', () => {
    exerciseNameChanged('asd')(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);

    const dispatchedAction = dispatch.mock.calls[1][0];

    expect(dispatchedAction.type).toBe(LOADING_SEARCH_RESULTS);
    expect(dispatchedAction.payload).toBe(true);
  });

  it('should call the search exercises service with the search term', () => {
    exerciseNameChanged('asd')(dispatch);

    const searchTerm = searchExercisesService.mock.calls[0][0];

    expect(searchTerm).toBe('asd');
  });

  it('should dispatch the loading search results action when the search is complete', async () => {
    await exerciseNameChanged('asd')(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(4);

    const dispatchedAction = dispatch.mock.calls[2][0];

    expect(dispatchedAction.type).toBe(LOADING_SEARCH_RESULTS);
    expect(dispatchedAction.payload).toBe(false);
  });

  it('should dispatch the new search exercises when the search is complete', async () => {
    await exerciseNameChanged('asd')(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(4);

    const dispatchedAction = dispatch.mock.calls[3][0];

    expect(dispatchedAction.type).toBe(NEW_SEARCH_EXERCISES);
    expect(dispatchedAction.payload.length).toBe(2);
    expect(dispatchedAction.payload[0].id).toBe('an_exercise_id');
    expect(dispatchedAction.payload[0].name).toBe('an exercise name');
  });

  it('should add the new exercise to the end of the search results', async () => {
    await exerciseNameChanged('asd')(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(4);

    const dispatchedAction = dispatch.mock.calls[3][0];

    expect(dispatchedAction.type).toBe(NEW_SEARCH_EXERCISES);
    expect(dispatchedAction.payload.length).toBe(2);
    expect(dispatchedAction.payload[1].id).toBe(NEW_EXERCISE_ID);
    expect(dispatchedAction.payload[1].name).toBe('asd');
  });
});

describe('the set changed function', () => {
  const exercises = [
    new Exercise({ id: 1, sets: [{ id: 2, reps: 12, lbs: 120 }] }),
    new Exercise({
      id: 3,
      sets: [{ id: 4, reps: 12, lbs: 135 }, { id: 5, reps: 0, lbs: 0 }]
    }),
    new Exercise({ id: 6, sets: [{ id: 7, reps: 5, lbs: 155 }] })
  ];

  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  afterEach(() => {
    exercises[1].sets[1].reps = 0;
    exercises[1].sets[1].lbs = 0;
  });

  it('should dispatch the new exercises action', () => {
    setChanged(5, { reps: 6 }, 3, exercises)(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(1);

    const dispatchedAction = dispatch.mock.calls[0][0];

    expect(dispatchedAction.type).toBe(NEW_EXERCISES);
  });

  it('should set the reps but not the lbs', () => {
    setChanged(5, { reps: 6 }, 3, exercises)(dispatch);

    const set = dispatch.mock.calls[0][0].payload[1].sets[1];

    expect(set.reps).toBe(6);
    expect(set.lbs).toBe(0);
  });

  it('should set the lbs but not the reps', () => {
    setChanged(5, { lbs: 300 }, 3, exercises)(dispatch);

    const set = dispatch.mock.calls[0][0].payload[1].sets[1];

    expect(set.reps).toBe(0);
    expect(set.lbs).toBe(300);
  });
});

jest.mock('axios');

import axios from 'axios';
import {
  getCurrentExercisesService,
  createExerciseService,
  updateExercise,
  deleteExercise
} from '../exercise';

describe('the exercise api', () => {
  it('should have a function for getting all exercises', () => {
    expect(getCurrentExercisesService).toBeDefined();
  });

  describe('getCurrentExercisesService function', () => {
    beforeEach(() => {
      axios.get.mockReset();
    });

    it('should return a promise', () => {
      expect(getCurrentExercisesService().then).toBeDefined();
    });

    it('should make a get call with axios', () => {
      getCurrentExercisesService();

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('/exercises?current=true');
    });

    it('should return the data, not the response object', async () => {
      axios.get.mockResolvedValue({
        data: [
          {
            name: 'Bench Press'
          },
          {
            name: 'Squats'
          }
        ]
      });

      const exercises = await getCurrentExercisesService();
      expect(exercises.length).toBe(2);
      expect(exercises[0].name).toBe('Bench Press');
      expect(exercises[1].name).toBe('Squats');
    });

    it('should return an error', async () => {
      axios.get.mockRejectedValue('Error!');

      expect.assertions(1);
      try {
        await getCurrentExercisesService();
      } catch (error) {
        expect(error).toBe('Error!');
      }
    });
  });

  it('should have a function for creating an exercise', () => {
    expect(createExerciseService).toBeDefined();
  });

  describe('createExerciseService function', () => {
    beforeEach(() => {
      axios.post.mockReset();
    });

    it('should return a promise', () => {
      expect(createExerciseService().then).toBeDefined();
    });

    it('should make a post call with axios', () => {
      const exercise = { name: 'Bench Press' };

      createExerciseService(exercise);

      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('/exercises', exercise);
    });

    it('should return the data, not the response object', async () => {
      axios.post.mockResolvedValue({ data: { id: 1, name: 'Bench Press' } });

      const exercise = await createExerciseService({ name: 'Bench Press' });
      expect(exercise.id).toBe(1);
      expect(exercise.name).toBe('Bench Press');
    });

    it('should return an error', async () => {
      axios.post.mockRejectedValue('Error!');

      expect.assertions(1);
      try {
        await createExerciseService({ name: 'Bench Press' });
      } catch (error) {
        expect(error).toBe('Error!');
      }
    });

    it('should throw an error if exercise has an ID', async () => {
      expect.assertions(1);
      try {
        await createExerciseService({ id: 1 });
      } catch (error) {
        expect(error.message).toBe('Cannot create an exercise that has an ID');
      }
    });
  });

  it('should have a function to updateExercise an exercise', () => {
    expect(updateExercise).toBeDefined();
  });

  describe('updateExercise function', () => {
    beforeEach(() => {
      axios.put.mockReset();
    });

    it('should return a promise', () => {
      expect(updateExercise().then).toBeDefined();
    });

    it('should make a put call with axios', () => {
      const exercise = { id: 1, name: 'Bench Press' };

      updateExercise(exercise);

      expect(axios.put).toHaveBeenCalledTimes(1);
      expect(axios.put).toHaveBeenCalledWith('/exercises/1', exercise);
    });

    it('should return the data, not the response object', async () => {
      axios.put.mockResolvedValue({ data: { id: 1, name: 'Bench Press' } });

      const exercise = await updateExercise({ id: 1, name: 'Bench Press' });
      expect(exercise.id).toBe(1);
      expect(exercise.name).toBe('Bench Press');
    });

    it('should return an error', async () => {
      axios.put.mockRejectedValue('Error!');

      expect.assertions(1);
      try {
        await updateExercise({ id: 1, name: 'Bench Press' });
      } catch (error) {
        expect(error).toBe('Error!');
      }
    });

    it('should throw an error if exercise does not have ID', async () => {
      expect.assertions(1);
      try {
        await updateExercise({ name: 'Bench Press' });
      } catch (error) {
        expect(error.message).toBe(
          'Cannot update an exercise that does not have an ID'
        );
      }
    });
  });

  it('should have a function to delete an exercise', () => {
    expect(deleteExercise).toBeDefined();
  });

  describe('deleteExercise function', () => {
    beforeEach(() => {
      axios.delete.mockReset();
    });

    it('should return a promise', () => {
      expect(deleteExercise().then).toBeDefined();
    });

    it('should make a delete call with axios', () => {
      const exercise = { id: 1, name: 'Bench Press' };

      deleteExercise(exercise);

      expect(axios.delete).toHaveBeenCalledTimes(1);
      expect(axios.delete).toHaveBeenCalledWith('/exercises/1');
    });

    it('should return success', async () => {
      axios.delete.mockResolvedValue();

      const response = await deleteExercise({ id: 1, name: 'Bench Press' });
      expect(response).toBe('Success');
    });

    it('should return an error', async () => {
      axios.delete.mockRejectedValue('Error!');

      expect.assertions(1);
      try {
        await deleteExercise({ id: 1, name: 'Bench Press' });
      } catch (error) {
        expect(error).toBe('Error!');
      }
    });

    it('should throw an error if exercise does not have ID', async () => {
      expect.assertions(1);
      try {
        await deleteExercise({ name: 'Bench Press' });
      } catch (error) {
        expect(error.message).toBe(
          'Cannot delete an exercise that does not have an ID'
        );
      }
    });
  });
});

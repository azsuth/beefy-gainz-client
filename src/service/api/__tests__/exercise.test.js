jest.mock('axios');

import axios from 'axios';
import { getExercises, createExercise, updateExercise, deleteExercise } from '../exercise';

describe('the exercise api', () => {
    it('should have a function for getting all exercises', () => {
        expect(getExercises).toBeDefined();
    });

    describe('the getExercises function', () => {
        beforeEach(() => {
            axios.get.mockReset();
        });

        it('should return a promise', () => {
            expect(getExercises().then).toBeDefined();
        });

        it('should make a get call with axios', () => {
            getExercises();

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('/api/exercises');
        });

        it('should return the data, not the response object', async () => {
            axios.get.mockResolvedValue({
                data: [{
                    name: 'Bench Press'
                }, {
                    name: 'Squats'
                }]
            });

            const exercises = await getExercises();
            expect(exercises.length).toBe(2);
            expect(exercises[0].name).toBe('Bench Press');
            expect(exercises[1].name).toBe('Squats');
        });

        it('should return an error', async () => {
            axios.get.mockRejectedValue('Error!');

            expect.assertions(1);
            try {
                await getExercises();
            } catch (error) {
                expect(error).toBe('Error!');
            }
        });
    });

    it('should have a function for creating an exercise', () => {
        expect(createExercise).toBeDefined();
    });

    describe('the createExercise function', () => {
        beforeEach(() => {
            axios.post.mockReset();
        });

        it('should return a promise', () => {
            expect(createExercise().then).toBeDefined();
        });

        it('should make a post call with axios', () => {
            const exercise = { name: 'Bench Press' };

            createExercise(exercise);

            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith('/api/exercises', exercise);
        });

        it('should return the data, not the response object', async () => {
            axios.post.mockResolvedValue({data: { id: 1, name: 'Bench Press' }});

            const exercise = await createExercise({ name: 'Bench Press' });
            expect(exercise.id).toBe(1);
            expect(exercise.name).toBe('Bench Press');
        });

        it('should return an error', async () => {
            axios.post.mockRejectedValue('Error!');

            expect.assertions(1);
            try {
                await createExercise({ name: 'Bench Press' });
            } catch (error) {
                expect(error).toBe('Error!');
            }
        });

        it('should throw an error if exercise has an ID', async () => {
            expect.assertions(1);
            try {
                await createExercise({ id: 1 });
            } catch (error) {
                expect(error).toBe('Cannot create an exercise that has an ID');
            }
        });
    });

    it('should have a function to updateExercise an exercise', () => {
        expect(updateExercise).toBeDefined();
    });

    describe('the updateExercise function', () => {
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
            expect(axios.put).toHaveBeenCalledWith('/api/exercises/1', exercise);
        });

        it('should return the data, not the response object', async () => {
            axios.put.mockResolvedValue({data: { id: 1, name: 'Bench Press' }});

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
                expect(error).toBe('Cannot update an exercise that does not have an ID');
            }
        })
    });

    it('should have a function to delete an exercise', () => {
        expect(deleteExercise).toBeDefined();
    });

    describe('the deleteExercise function', () => {
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
            expect(axios.delete).toHaveBeenCalledWith('/api/exercises/1');
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
                expect(error).toBe('Cannot delete an exercise that does not have an ID');
            }
        })
    });
});
import axios from 'axios';

export const getExercisesService = async () => {
    const response = await axios.get('/exercises');
    return response.data;
};

export const createExercise = async (exercise) => {
    if (exercise.id) {
        throw Error('Cannot create an exercise that has an ID');
    }

    const response = await axios.post('/exercises', exercise);
    return response.data;
};

export const updateExercise = async (exercise) => {
    if (!exercise.id) {
        throw Error('Cannot update an exercise that does not have an ID');
    }

    const response = await axios.put(`/exercises/${exercise.id}`, exercise);
    return response.data;
};

export const deleteExercise = async (exercise) => {
    if (!exercise.id) {
        throw Error('Cannot delete an exercise that does not have an ID');
    }

    await axios.delete(`/exercises/${exercise.id}`);
    return 'Success';
};
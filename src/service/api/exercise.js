import axios from 'axios';

export const getExercises = async () => {
    const response = await axios.get('/api/exercises');
    return response.data;
};

export const createExercise = async (exercise) => {
    if (exercise.id) {
        throw 'Cannot create an exercise that has an ID';
    }

    const response = await axios.post('/api/exercises', exercise);
    return response.data;
};

export const updateExercise = async (exercise) => {
    if (!exercise.id) {
        throw 'Cannot update an exercise that does not have an ID';
    }

    const response = await axios.put(`/api/exercises/${exercise.id}`, exercise);
    return response.data;
};

export const deleteExercise = async (exercise) => {
    if (!exercise.id) {
        throw 'Cannot delete an exercise that does not have an ID';
    }

    const response = await axios.delete(`/api/exercises/${exercise.id}`);
    return 'Success';
};
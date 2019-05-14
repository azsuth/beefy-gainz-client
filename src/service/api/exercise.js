import axios from 'axios';

export const getCurrentExercisesService = async () => {
    const response = await axios.get('/exercises?current=true');
    return response.data;
};

export const searchExercisesService = async searchTerm => {
    const response = await axios.get(`/exercises?search=${searchTerm}`);
    return response.data;
}

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
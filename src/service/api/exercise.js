import axios from 'axios';

import Exercise from 'model/Exercise';

export const getCurrentExercisesService = async () => {
  const response = await axios.get('/exercises?current=true');
  return response.data.map(exercise => new Exercise(exercise));
};

export const searchExercisesService = async searchTerm => {
  const response = await axios.get(`/exercises?search=${searchTerm}`);
  return response.data.map(exercise => new Exercise(exercise));
};

export const createExerciseService = async exercise => {
  if (exercise.id) {
    throw Error('Cannot create an exercise that has an ID');
  }

  const response = await axios.post('/exercises', exercise);
  return new Exercise(response.data);
};

export const updateExerciseService = async exercise => {
  if (!exercise.id) {
    throw Error('Cannot update an exercise that does not have an ID');
  }

  const response = await axios.put(`/exercises/${exercise.id}`, exercise);
  return response.data;
};

export const deleteExerciseService = async exerciseId => {
  return await axios.delete(`/exercises/${exerciseId}`);
};

export const createSetService = async exerciseId => {
  const response = await axios.post(`/exercises/${exerciseId}/sets`, {});
  return response.data;
}

export const updateSetService = async (set, exerciseId) => {
  if (!set.id) {
    throw Error('Cannot update a set that does not have an ID');
  }

  const response = await axios.put(
    `/exercises/${exerciseId}/sets/${set.id}`,
    set
  );

  return response.data;
};

export const deleteSetService = async (setId, exerciseId) => {
  return await axios.delete(`/exercises/${exerciseId}/sets/${setId}`);
}

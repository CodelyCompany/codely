export const getExercisesFromState = (state) => state.exercises.exercises;

export const getExercisesQuantity = (state) => state.exercises.exercises.length;

export const getUncheckedExercises = (state) =>
  state.exercises.exercisesToCheck;

export const getExerciseById = (state, id) =>
  state.exercises.exercises.find((el) => el._id === id);

export const getError = (state) => state.exercises.error;

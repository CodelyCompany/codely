export const getExercisesFromState = (state) => state.exercises.exercises;

export const getExercisesQuantity = (state) => state.exercises.exercises.length;

export const getAllCreatedExercises = (state) => _.concat(
  state.exercises.exercises,
  state.exercises.exercisesToCheck,
  state.exercises.unfinishedExercises
);

export const getUncheckedExercises = (state) =>
  state.exercises.exercisesToCheck;

export const getExerciseById = (id) => (state) =>
  state.exercises.exercises.find((el) => el._id === id);

export const getError = (state) => state.exercises.error;

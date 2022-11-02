export const getExercisesFromState = (state) => state.exercises.exercises;

export const getExercisesQuantity = (state) => state.exercises.exercises.length;

export const getExerciseById = (id) => (state) =>
  state.exercises.exercises.find((el) => el._id === id);

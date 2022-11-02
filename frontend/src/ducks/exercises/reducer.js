import { types } from './types';

export const exercisesReducer = (
  state = { exercises: [], error: false },
  action
) => {
  switch (action.type) {
    case types.GET_EXERCISES_SUCCESS:
      return { exercises: action.payload };
    case types.POST_EXERCISE_SUCCESS:
      return { exercises: [...state.exercises, action.payload], error: false };
    case types.POST_EXERCISE_FAILURE:
      return { ...state, error: true };
    case types.DELETE_EXERCISE_SUCCESS:
      return {
        exercises: [
          ...state.exercises.filter((ex) => ex._id !== action.payload.id),
        ],
        error: false,
      };
    case types.DELETE_EXERCISE_FAILURE:
      return { ...state, error: true };
    case types.UPDATE_EXERCISE_SUCCESS:
      return {
        exercises: [
          ...state.exercises.filter((ex) => ex._id !== action.payload._id),
          action.payload,
        ],
        error: false,
      };
    case types.UPDATE_EXERCISE_FAILURE:
      return { ...state, error: false };
    case types.GET_EXERCISE_SUCCESS:
      return {
        exercises: [
          ...state.exercises.filter((ex) => ex._id !== action.payload._id),
          action.payload,
        ],
        error: false,
      };
    default:
      return state;
  }
};

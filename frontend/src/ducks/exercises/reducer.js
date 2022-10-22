import { types } from './types';

export const exercisesReducer = (state = { exercises: [] }, action) => {
  switch (action.type) {
    case types.GET_EXERCISES_SUCCESS:
      return { exercises: action.payload };
    case types.POST_EXERCISE_SUCCESS:
      return { exercises: [...state.exercises, action.payload] };
    default:
      return state;
  }
};

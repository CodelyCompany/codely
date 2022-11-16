import { types } from './types';

export const exercisesReducer = (
  state = { exercises: [], exercisesToCheck: [], error: false },
  action
) => {
  switch (action.type) {
    case types.GET_EXERCISES_SUCCESS:
      return { ...state, exercises: action.payload };
    // On this type, exercises are being added to the state
    case types.PUT_CHECK_EXERCISE_SUCCESS:
      return {
        ...state,
        exercises: [...state.exercises, action.payload],
        exercisesToCheck: state.exercisesToCheck.filter(
          (ex) => ex._id !== action.payload._id
        ),
      };
    case types.GET_EXERCISES_TO_CHECK_SUCCESS:
      return { ...state, exercisesToCheck: action.payload };
    //This action isn't updating exercises,
    //because exercises are passed to the admin.
    case types.POST_EXERCISE_SUCCESS:
      return {
        ...state,
        error: false,
      };
    case types.POST_EXERCISE_FAILURE:
      return { ...state, error: true };
    case types.DELETE_EXERCISE_SUCCESS:
      return {
        ...state,
        exercises: state.exercises.filter((ex) => ex._id !== action.payload.id),
        error: false,
      };
    case types.DELETE_EXERCISE_FAILURE:
      return { ...state, error: true };
    case types.UPDATE_EXERCISE_SUCCESS:
      return {
        ...state,
        exercises: state.exercises.filter(
          (ex) => ex._id !== action.payload._id
        ),
        error: false,
      };
    case types.UPDATE_EXERCISE_FAILURE:
      return { ...state, error: false };
    case types.GET_EXERCISE_SUCCESS:
      return {
        ...state,
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

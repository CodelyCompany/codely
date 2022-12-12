import { types } from './types';

export const popupsReducer = (
  state = { add: false, delete: false, update: false },
  action
) => {
  switch (action.type) {
    case types.ADD_EXERCISE:
      return { ...state, add: true };
    case types.DELETE_EXERCISE:
      return { ...state, delete: true };
    case types.UPDATE_EXERCISE:
      return { ...state, update: true };
    case types.ADD_EXERCISE_CLOSE:
      return { ...state, add: false };
    case types.DELETE_EXERCISE_CLOSE:
      return { ...state, delete: false };
    case types.UPDATE_EXERCISE_CLOSE:
      return { ...state, update: false };
    default:
      return state;
  }
};

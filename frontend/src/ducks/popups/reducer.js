import { types } from './types';

export const popupsReducer = (
  state = { add: false, delete: false, update: false },
  action
) => {
  switch (action.type) {
    case types.ADD_EXERCISE:
      return { ...state, add: !state.add };
    case types.DELETE_EXERCISE:
      return { ...state, delete: !state.delete };
    case types.UPDATE_EXERCISE:
      return { ...state, update: !state.update };
    default:
      return state;
  }
};

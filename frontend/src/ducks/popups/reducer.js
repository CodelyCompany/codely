import { types } from './types';

export const popupsReducer = (
  state = { add: false, delete: false, update: false },
  action
) => {
  switch (action.type) {
    case types.ADD_EXERCISE:
      return { ...store, add: !store.add };
    case types.DELETE_EXERCISE:
      return { ...store, delete: !store.delete };
    case types.UPDATE_EXERCISE:
      return { ...state, update: !store.update };
    default:
      return state;
  }
};

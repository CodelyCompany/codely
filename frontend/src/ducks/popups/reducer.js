import { types } from 'ducks/popups/types';

export const popupsReducer = (state = { popups: [] }, action) => {
  switch (action.type) {
    case types.ADD_POPUP:
      return { ...state, popups: [...state.popups, action.payload] };
    case types.REMOVE_POPUP:
      return {
        ...state,
        popups: state.popups.filter((popup) => popup.key !== action.payload),
      };
    default:
      return state;
  }
};

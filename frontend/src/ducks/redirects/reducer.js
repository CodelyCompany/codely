import { types } from './types';

export const redirectReducer = (state = { redirect: false }, action) => {
  switch (action.type) {
    case types.REDIRECT_AFTER_ADD_EX_START:
      return { redirect: true };
    case types.REDIRECT_AFTER_ADD_EX_FINISHED:
      return { redirect: false };
    default:
      return state;
  }
};

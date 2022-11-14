import { types } from './types';

export const redirectReducer = (state = { redirect: false }, action) => {
  switch (action.type) {
    case types.REDIRECT_START:
      return { redirect: true };
    case types.REDIRECT_FINISHED:
      return { redirect: false };
    default:
      return state;
  }
};

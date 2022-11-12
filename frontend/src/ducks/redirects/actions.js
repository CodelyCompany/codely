import { types } from './types';

export const StartRedirect = () => ({
  type: types.REDIRECT_AFTER_ADD_EX_START,
});

export const StopRedirect = () => ({
  type: types.REDIRECT_AFTER_ADD_EX_FINISHED,
});

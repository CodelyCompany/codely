import { types } from 'ducks/redirects/types';

export const StartRedirect = () => ({
  type: types.REDIRECT_START,
});

export const StopRedirect = () => ({
  type: types.REDIRECT_FINISHED,
});

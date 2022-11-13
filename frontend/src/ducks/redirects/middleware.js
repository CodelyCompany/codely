import { types as exTypes } from '../exercises/types';

import { types } from './types';

export const startRedirect = (store) => (next) => (action) => {
  if (
    action.type === exTypes.POST_EXERCISE_SUCCESS ||
    action.type === exTypes.UPDATE_EXERCISE_SUCCESS
  ) {
    next({ type: types.REDIRECT_START });
  }
  next(action);
};
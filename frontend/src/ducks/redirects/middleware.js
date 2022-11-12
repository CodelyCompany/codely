import { types as exTypes } from '../exercises/types';

import { types } from './types';

export const startRedirect = (store) => (next) => (action) => {
  if (action.type === exTypes.POST_EXERCISE_SUCCESS) {
    console.log('siema');
    next({ type: types.REDIRECT_AFTER_ADD_EX_START });
  }
  next(action);
};

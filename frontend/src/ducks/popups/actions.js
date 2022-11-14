import { types } from './types';

export const ChangeAddStatus = () => ({
  type: types.ADD_EXERCISE,
});
export const ChangeUpdateStatus = () => ({
  type: types.UPDATE_EXERCISE,
});
export const ChangeDeleteStatus = () => ({
  type: types.DELETE_EXERCISE,
});
export const CloseAddPopup = () => ({
  type: types.ADD_EXERCISE_CLOSE,
});
export const CloseUpdatePopup = () => ({
  type: types.UPDATE_EXERCISE_CLOSE,
});
export const CloseDeletePopup = () => ({
  type: types.DELETE_EXERCISE_CLOSE,
});

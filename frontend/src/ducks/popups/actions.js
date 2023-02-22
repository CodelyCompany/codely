import { types } from 'ducks/popups/types';

export const addPopup = (messageKey, variant) => ({
  type: types.ADD_POPUP,
  payload: {
    key: new Date().getTime() + Math.random(),
    messageKey,
    options: { variant },
  },
});

export const removePopup = (key) => ({
  type: types.REMOVE_POPUP,
  payload: key,
});
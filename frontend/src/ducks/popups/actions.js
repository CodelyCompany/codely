import { types } from './types';

export const addPopup = (payload) => ({
  type: types.ADD_POPUP,
  payload: { ...payload, key: new Date().getTime() + Math.random() },
});

export const removePopup = (payload) => ({
  type: types.REMOVE_POPUP,
  payload,
});
import { types } from './types';

export const socketReducer = (state = { socket: null }, action) => {
  switch (action.type) {
    case types.CONNECT_SOCKET:
      return { socket: action.payload };
    case types.DISCONNECT_SOCKET:
      return { socket: null };
    default:
      return state;
  }
};

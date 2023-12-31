import { types } from 'ducks/socket/types';

export const ConnectSocket = (payload) => ({
  type: types.CONNECT_SOCKET,
  payload,
});

export const DisconnectSocket = () => ({
  type: types.DISCONNECT_SOCKET,
});

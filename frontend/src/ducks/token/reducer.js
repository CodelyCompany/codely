import { types } from './types';

export const tokenReducer = (state = { token: null }, action) => {
  switch (action.type) {
    case types.GET_TOKEN_SUCCESS:
      return { token: action.payload.access_token };
    case types.GET_TOKEN_FAILURE:
      return { token: null };
    default:
      return state;
  }
};

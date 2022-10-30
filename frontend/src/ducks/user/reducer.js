import { types } from './types';

export const usersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case types.GET_USERS_SUCCESS:
      return { users: action.payload };
    case types.POST_USER_SUCCESS:
      return { users: [...state.users, action.payload] };
    default:
      return state;
  }
};

import { types } from 'ducks/user/types';
import * as _ from 'lodash';

export const usersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case types.GET_USERS_SUCCESS:
      return { users: action.payload };
    case types.POST_USER_SUCCESS:
      return { users: _.uniqBy([...state.users, action.payload], '_id') };
    case types.UPDATE_USER_SUCCESS:
    case types.UPLOAD_AVATAR_SUCCESS:
      return {
        users: [
          ...state.users.filter((usr) => usr._id !== action.payload._id),
          action.payload,
        ],
      };
    default:
      return state;
  }
};

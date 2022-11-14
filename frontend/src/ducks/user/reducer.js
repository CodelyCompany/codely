import * as _ from 'lodash';

import { types } from './types';

export const usersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case types.GET_USERS_SUCCESS:
      return { users: action.payload };
    case types.POST_USER_SUCCESS:
      return { users: _.uniqBy([...state.users, action.payload], ['_id']) };
    default:
      return state;
  }
};

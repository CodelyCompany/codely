import { types } from './types';

export const notificationsReducer = (state = { notifications: [] }, action) => {
  switch (action.type) {
    case types.GET_NOTIFICATIONS_SUCCESS:
      return { notifications: action.payload };
    case types.READ_NOTIFICATION_SUCCESS:
      return {
        notifications: [
          state.notifications.map((not) => {
            if (not._id === action.payload._id) {
              return { ...not, read: true };
            }
            return not;
          }),
        ],
      };
    default:
      return state;
  }
};

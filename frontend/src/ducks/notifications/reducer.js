import { types } from 'ducks/notifications/types';

export const notificationsReducer = (state = { notifications: [] }, action) => {
  switch (action.type) {
    case types.GET_NOTIFICATIONS_SUCCESS:
      return { notifications: action.payload };
    case types.READ_NOTIFICATION_SUCCESS:
      return {
        notifications: state.notifications.map((not) => {
          if (not._id === action.payload._id) {
            return action.payload;
          }
          return not;
        }),
      };
    default:
      return state;
  }
};

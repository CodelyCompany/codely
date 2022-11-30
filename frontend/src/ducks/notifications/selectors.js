export const getNotifications = (state) => state.notifications.notifications;

export const getUnreadNotificationsQuantity = (state) =>
  state.notifications.notifications.filter((not) => !not.read).length;

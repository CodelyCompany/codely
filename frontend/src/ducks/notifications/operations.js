import { createAction } from 'redux-api-middleware';

import { types } from './types';

export const GetNotifications = (userId, token) =>
  createAction({
    endpoint: `${
      import.meta.env.REACT_APP_BACKEND || 'http://localhost:5000'
    }/notifications/${userId}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    types: [
      types.GET_NOTIFICATIONS_REQUEST,
      {
        type: types.GET_NOTIFICATIONS_SUCCESS,
        payload: async (action, state, res) => await res.json(),
      },
      types.GET_NOTIFICATIONS_FAILURE,
    ],
  });

export const AddNotification = (userId, notification, token) =>
  createAction({
    endpoint: `${
      import.meta.env.REACT_APP_BACKEND || 'http://localhost:5000'
    }/notifications/${userId}`,
    method: 'POST',
    body: JSON.stringify(notification),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    types: [
      types.POST_NOTIFICATION_REQUEST,
      {
        type: types.POST_NOTIFICATION_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.POST_NOTIFICATION_FAILURE,
    ],
  });

export const ReadNotification = (notificationId, token) =>
  createAction({
    endpoint: `${
      import.meta.env.REACT_APP_BACKEND || 'http://localhost:5000'
    }/notifications/${notificationId}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    types: [
      types.READ_NOTIFICATION_REQUEST,
      {
        type: types.READ_NOTIFICATION_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.READ_NOTIFICATION_FAILURE,
    ],
  });

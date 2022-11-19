import { createAction } from 'redux-api-middleware';

import { types } from './types';

export const GetUsers = (token = null) =>
  createAction({
    endpoint: `${
      process.env.REACT_APP_BACKEND || 'https://localhost:5000'
    }/users/`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    types: [
      types.GET_USERS_REQUEST,
      {
        type: types.GET_USERS_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.GET_USERS_FAILURE,
    ],
  });

export const AddUser = (body, token = null) =>
  createAction({
    endpoint: `${
      process.env.REACT_APP_BACKEND || 'https://localhost:5000'
    }/users/addUser`,
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    types: [
      types.POST_USER_REQUEST,
      {
        type: types.POST_USER_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.POST_USER_FAILURE,
    ],
  });

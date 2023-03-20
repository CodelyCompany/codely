import { types } from 'ducks/user/types';
import { createAction } from 'redux-api-middleware';

export const GetUsers = (token) =>
  createAction({
    endpoint: `${
      process.env.REACT_APP_BACKEND || 'http://localhost:5000'
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
        payload: async (action, state, res) => await res.json(),
      },
      types.GET_USERS_FAILURE,
    ],
  });

export const AddUser = (body, token) =>
  createAction({
    endpoint: `${
      process.env.REACT_APP_BACKEND || 'http://localhost:5000'
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
        payload: async (action, state, res) => await res.json(),
      },
      types.POST_USER_FAILURE,
    ],
  });

export const UpdateUser = (body, token) =>
  createAction({
    endpoint: `${
      process.env.REACT_APP_BACKEND || 'http://localhost:5000'
    }/users/editUser`,
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    types: [
      types.UPDATE_USER_REQUEST,
      {
        type: types.UPDATE_USER_SUCCESS,
        payload: async (action, state, res) => await res.json(),
      },
      types.UPDATE_USER_FAILURE,
    ],
  });

export const UploadAvatar = (userId, body, token) =>
  createAction({
    endpoint: `${
      process.env.REACT_APP_BACKEND || 'http://localhost:5000'
    }/users/${userId}/avatar`,
    method: 'PATCH',
    body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    types: [
      types.UPLOAD_AVATAR_REQUEST,
      {
        type: types.UPLOAD_AVATAR_SUCCESS,
        payload: async (action, state, res) => await res.json(),
      },
      types.UPLOAD_AVATAR_FAILURE,
    ],
  });

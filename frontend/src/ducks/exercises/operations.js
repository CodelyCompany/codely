import { createAction } from 'redux-api-middleware';

import { types } from './types';

export const GetExercises = (token) =>
  createAction({
    endpoint: `${
      process.env.REACT_APP_BACKEND || 'http://localhost:5000'
    }/exercises/`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    types: [
      types.GET_EXERCISES_REQUEST,
      {
        type: types.GET_EXERCISES_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.GET_EXERCISES_FAILURE,
    ],
  });

export const AddExercise = (body, token) =>
  createAction({
    endpoint: `${
      process.env.REACT_APP_BACKEND || 'http://localhost:5000'
    }/exercises/addExercise`,
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    types: [
      types.POST_EXERCISE_REQUEST,
      {
        type: types.POST_EXERCISE_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.POST_EXERCISE_FAILURE,
    ],
  });

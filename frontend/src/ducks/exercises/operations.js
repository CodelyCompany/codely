import { createAction } from 'redux-api-middleware';

import { types } from './types';

export const GetExercises = () =>
  createAction({
    endpoint: 'http://localhost:5000/exercises/',
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
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

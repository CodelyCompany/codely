import { createAction } from 'redux-api-middleware';

import { types } from './types';

export const GetExercises = () =>
  createAction({
    endpoint: `${
      process.env.REACT_APP_BACKEND || 'http://localhost:5000'
    }/exercises/`,
    method: 'GET',
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

export const AddExercise = () =>
  createAction({
    endpoint: `${
      process.env.REACT_APP_BACKEND || 'http://localhost:5000'
    }/exercises/addExercise`,
    method: 'POST',
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

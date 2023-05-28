import { types } from 'ducks/exercises/types';
import { createAction } from 'redux-api-middleware';

export const GetExercises = (token) =>
  createAction({
    endpoint: `${
      process.env.REACT_APP_BACKEND || 'http://localhost:5000'
    }/exercises/checked`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    types: [
      types.GET_EXERCISES_REQUEST,
      {
        type: types.GET_EXERCISES_SUCCESS,
        payload: async (action, state, res) => await res.json(),
      },
      types.GET_EXERCISES_FAILURE,
    ],
  });

export const GetUncheckedExercises = (token) =>
  createAction({
    endpoint: `${
      process.env.REACT_APP_BACKEND || 'http://localhost:5000'
    }/exercises/unchecked`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    types: [
      types.GET_EXERCISES_TO_CHECK_REQUEST,
      {
        type: types.GET_EXERCISES_TO_CHECK_SUCCESS,
        payload: async (action, state, res) => await res.json(),
      },
      types.GET_EXERCISES_TO_CHECK_FAILURE,
    ],
  });

export const AddExercise = (body, token, callback) =>
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
          callback?.(`/Exercises/form?id=${json._id}`);
          return json;
        },
      },
      types.POST_EXERCISE_FAILURE,
    ],
  });

export const DeleteExercise = (id, token) =>
  createAction({
    endpoint: `${
      process.env.REACT_APP_BACKEND || 'http://localhost:5000'
    }/exercises/deleteExercise/${id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    types: [
      types.DELETE_EXERCISE_REQUEST,
      {
        type: types.DELETE_EXERCISE_SUCCESS,
        payload: async (action, state, res) => await res.json(),
      },
      types.DELETE_EXERCISE_FAILURE,
    ],
  });

export const DeleteUncheckedExercise = (id, token) =>
  createAction({
    endpoint: `${
      process.env.REACT_APP_BACKEND || 'http://localhost:5000'
    }/exercises/deleteExercise/${id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    types: [
      types.DELETE_UNCHECKED_EXERCISE_REQUEST,
      {
        type: types.DELETE_UNCHECKED_EXERCISE_SUCCESS,
        payload: async (action, state, res) => await res.json(),
      },
      types.DELETE_UNCHECKED_EXERCISE_FAILURE,
    ],
  });

export const UpdateExercise = (body, token, callback) =>
  createAction({
    endpoint: `${
      process.env.REACT_APP_BACKEND || 'http://localhost:5000'
    }/exercises/editExercise/`,
    method: 'PATCH',
    body: JSON.stringify({ ...body, checked: false }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    types: [
      types.UPDATE_EXERCISE_REQUEST,
      {
        type: types.UPDATE_EXERCISE_SUCCESS,
        payload: async (action, state, res) => {
          const response = await res.json();
          callback?.();
          return response;
        },
      },
      types.UPDATE_EXERCISE_FAILURE,
    ],
  });

export const GetExercise = (id, token, callback) =>
  createAction({
    endpoint: `${
      process.env.REACT_APP_BACKEND || 'http://localhost:5000'
    }/exercises/${id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    types: [
      types.GET_EXERCISE_REQUEST,
      {
        type: types.GET_EXERCISE_SUCCESS,
        payload: async (action, state, res) => {
          const response = await res.json();
          callback?.(response);
          return response;
        },
      },
      types.GET_EXERCISE_FAILURE,
    ],
  });

export const CheckExercise = (id, token) =>
  createAction({
    endpoint: `${
      process.env.REACT_APP_BACKEND || 'http://localhost:5000'
    }/exercises/checkExercise/${id}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    types: [
      types.PUT_CHECK_EXERCISE_REQUEST,
      {
        type: types.PUT_CHECK_EXERCISE_SUCCESS,
        payload: async (action, state, res) => await res.json(),
      },
      types.PUT_CHECK_EXERCISE_FAILURE,
    ],
  });

export const VerifyExercise = (body, callback, token, callbackAfterResponse) =>
  createAction({
    endpoint: `${
      process.env.REACT_APP_BACKEND || 'http://localhost:5000'
    }/exercises/checkBeforeAddExercise`,
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    types: [
      types.POST_VERIFY_SOLUTION_REQUEST,
      {
        type: types.POST_VERIFY_SOLUTION_SUCCESS,
        payload: async (action, state, res) => {
          const response = await res.json();
          callback?.(response);
          callbackAfterResponse?.(true);
          return response;
        },
      },
      types.POST_VERIFY_SOLUTION_FAILURE,
    ],
  });
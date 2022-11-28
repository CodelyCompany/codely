import { createAction } from 'redux-api-middleware';

import { types } from './types';

export const GetExercises = (token = null) =>
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
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.GET_EXERCISES_FAILURE,
    ],
  });

export const GetUncheckedExercises = (token = null) =>
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
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.GET_EXERCISES_TO_CHECK_FAILURE,
    ],
  });

export const AddExercise = (body, token = null) =>
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

export const DeleteExercise = (id, token = null) =>
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
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.DELETE_EXERCISE_FAILURE,
    ],
  });

export const DeleteUncheckedExercise = (id, token = null) =>
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
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.DELETE_UNCHECKED_EXERCISE_FAILURE,
    ],
  });

export const UpdateExercise = (body, token = null) =>
  createAction({
    endpoint: `${
      process.env.REACT_APP_BACKEND || 'http://localhost:5000'
    }/exercises/editExercise/`,
    method: 'PUT',
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
          const json = await res.json();
          return json;
        },
      },
      types.UPDATE_EXERCISE_FAILURE,
    ],
  });

export const GetExercise = (id, token = null) =>
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
          const json = await res.json();
          return json;
        },
      },
      types.GET_EXERCISE_FAILURE,
    ],
  });

export const CheckExercise = (id, token = null) =>
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
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.PUT_CHECK_EXERCISE_FAILURE,
    ],
  });

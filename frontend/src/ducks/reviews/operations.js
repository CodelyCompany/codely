import { createAction } from 'redux-api-middleware';

import { types } from './types';

export const GetReviews = (token = null) =>
  createAction({
    endpoint: `${
      process.env.REACT_APP_BACKEND || 'http://localhost:5000'
    }/reviews/`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    types: [
      types.GET_REVIEWS_REQUEST,
      {
        type: types.GET_REVIEWS_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.GET_REVIEWS_FAILURE,
    ],
  });

export const AddReview = (body, token = null) =>
  createAction({
    endpoint: `${
      process.env.REACT_APP_BACKEND || 'http://localhost:5000'
    }/reviews/addReview`,
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    types: [
      types.POST_REVIEW_REQUEST,
      {
        type: types.POST_REVIEW_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.POST_REVIEW_FAILURE,
    ],
  });

export const EditReview = (body, token = null) =>
  createAction({
    endpoint: `${
      process.env.REACT_APP_BACKEND || 'http://localhost:5000'
    }/reviews/editReview`,
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    types: [
      types.EDIT_REVIEW_REQUEST,
      {
        type: types.EDIT_REVIEW_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.EDIT_REVIEW_FAILURE,
    ],
  });

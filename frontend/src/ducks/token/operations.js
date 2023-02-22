import { createAction } from 'redux-api-middleware';

import { types } from './types';

export const GetAuthToken = () =>
  createAction({
    endpoint: `https://${import.meta.env.REACT_APP_DOMAIN}/oauth/token`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: import.meta.env.REACT_APP_BACKEND_CLIENT_ID,
      client_secret: import.meta.env.REACT_APP_BACKEND_CLIENT_SECRET,
      audience: `${import.meta.env.REACT_APP_BACKEND || 'http://localhost:5000'}`,
      grant_type: 'client_credentials',
    }),
    types: [
      types.GET_TOKEN_REQUEST,
      {
        type: types.GET_TOKEN_SUCCESS,
        payload: async (action, state, res) => await res.json(),
      },
      types.GET_TOKEN_FAILURE,
    ],
  });

import { createAction } from 'redux-api-middleware';

import { types } from './types';

export const GetAuthToken = () =>
  createAction({
    endpoint: `http://${process.env.REACT_APP_DOMAIN}/oauth/token`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      client_id: process.env.REACT_APP_CONTAINERS_CLIENT_ID,
      client_secret: process.env.REACT_APP_CONTAINERS_CLIENT_SECRET,
      audience: `${
        process.env.REACT_APP_CONTAINERS_ADDRESS || 'http://localhost:5001'
      }`,
      grant_type: 'client_credentials',
    },
    types: [
      types.GET_TOKEN_REQUEST,
      {
        type: types.GET_TOKEN_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.GET_TOKEN_FAILURE,
    ],
  });

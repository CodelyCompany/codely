import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createMiddleware } from 'redux-api-middleware';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { exercisesReducer } from './exercises/reducer';
import { popupsReducer } from './popups/reducer';
import { startRedirect } from './redirects/middleware';
import { redirectReducer } from './redirects/reducer';
import { reviewsReducer } from './reviews/reducer';
import { tokenReducer } from './token/reducer';
import { usersReducer } from './user/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers({
  exercises: exercisesReducer,
  users: usersReducer,
  popups: popupsReducer,
  redirects: redirectReducer,
  reviews: reviewsReducer,
  token: tokenReducer,
});

const store = createStore(
  combinedReducers,
  composeEnhancers(
    applyMiddleware(thunk, createMiddleware(), startRedirect, logger)
  )
);

export default store;

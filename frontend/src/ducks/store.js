import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createMiddleware } from 'redux-api-middleware';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { exercisesReducer } from './exercises/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers({
  exercises: exercisesReducer,
});

const store = createStore(
  combinedReducers,
  composeEnhancers(applyMiddleware(thunk, createMiddleware(), logger))
);

export default store;

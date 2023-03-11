import { exercisesReducer } from 'ducks/exercises/reducer';
import { notificationsReducer } from 'ducks/notifications/reducer';
import popupMiddleware from 'ducks/popups/middleware';
import { popupsReducer } from 'ducks/popups/reducer';
import { startRedirect } from 'ducks/redirects/middleware';
import { redirectReducer } from 'ducks/redirects/reducer';
import { reviewsReducer } from 'ducks/reviews/reducer';
import { socketReducer } from 'ducks/socket/reducer';
import { tokenReducer } from 'ducks/token/reducer';
import { usersReducer } from 'ducks/user/reducer';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createMiddleware } from 'redux-api-middleware';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers({
  exercises: exercisesReducer,
  users: usersReducer,
  popups: popupsReducer,
  redirects: redirectReducer,
  reviews: reviewsReducer,
  token: tokenReducer,
  socket: socketReducer,
  notifications: notificationsReducer,
});

const store = createStore(
  combinedReducers,
  composeEnhancers(
    applyMiddleware(
      thunk,
      createMiddleware(),
      startRedirect,
      popupMiddleware,
      logger
    )
  )
);

export default store;

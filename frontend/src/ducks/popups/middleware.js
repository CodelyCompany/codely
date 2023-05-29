import { addPopup } from 'ducks/popups/actions';

const keymap = {
  POST_EXERCISE_SUCCESS: 'exercise-to-be-verified-message',
  POST_EXERCISE_FAILURE:
    'error-passing-exercise-for-verification-message',
  DELETE_EXERCISE_SUCCESS: 'exercise-deleted-message',
  DELETE_EXERCISE_FAILURE: 'error-deleting-exercise-message',
  UPDATE_EXERCISE_SUCCESS: 'exercise-update-passed-for-verification-message',
  UPDATE_EXERCISE_FAILURE: 'error-updating-exercise-message',
};

const popupMiddleware = (store) => (next) => (action) => {
  if (Object.keys(keymap).includes(action.type))
    store.dispatch(
      addPopup(
        keymap[action.type],
        action.type.endsWith('SUCCESS') ? 'success' : 'error'
      )
    );
  next(action);
};

export default popupMiddleware;

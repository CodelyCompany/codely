import { addPopup } from 'ducks/popups/actions';

const keymap = {
  UPDATE_ENTIRE_EXERCISE_SUCCESS: 'exercise-created-message',
  UPDATE_ENTIRE_EXERCISE_FAILURE: 'exercise-updating-error',
  DELETE_EXERCISE_SUCCESS: 'exercise-deleted-message',
  DELETE_EXERCISE_FAILURE: 'error-deleting-exercise-message',
  UPLOAD_AVATAR_SUCCESS: 'avatar-uploaded-message',
  UPLOAD_AVATAR_FAILURE: 'avatar-uploading-error',
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

import { addPopup } from "./actions";

const keymap = {
    'POST_EXERCISE_SUCCESS': 'Exercise passed for admin verification',
    'POST_EXERCISE_FAILURE': 'Error occured during passing exercise for admin verification',
    'DELETE_EXERCISE_SUCCESS': 'Exercise deleted successfuly',
    'DELETE_EXERCISE_FAILURE': 'Error occured during deleting exercise',
    'UPDATE_EXERCISE_SUCCESS': 'Updated passed for admin verification',
    'UPDATE_EXERCISE_FAILURE': 'Error occured during updating exercise',
};

const popupMiddleware = (store) => (next) => (action) => {

    if (Object.keys(keymap).includes(action.type))
        store.dispatch(addPopup({
            messageKey: keymap[action.type],
            options: { variant: action.type.endsWith('SUCCESS') ? 'success' : 'error' },
        }));
    next(action);
};

export default popupMiddleware;
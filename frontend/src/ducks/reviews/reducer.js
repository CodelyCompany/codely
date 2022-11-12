import { types } from './types';

export const reviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case types.GET_REVIEWS_SUCCESS:
      return { reviews: action.payload };
    case types.POST_REVIEW_SUCCESS:
      return { reviews: [...state.reviews, action.payload] };
    case types.EDIT_REVIEW_SUCCESS || types.DOWNVOTE_REVIEW_SUCCESS || types.UPVOTE_REVIEW_SUCCESS:
      return { reviews: state.reviews.map((review) =>
        review._id == action.payload._id ?
        action.payload :
        review
        ) };
    default:
      return state;
  }
};

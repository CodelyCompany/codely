export const getReviewsByExerciseId = (id) => (state) =>
  state.reviews.reviews.filter((review) => review.exercise === id);

export const getReviewsByUserId = (id) => (state) =>
  state.reviews.reviews.filter((review) => review.author === id);

export const getRatingByExerciseId = (id) => (state) => {
  const reviews = state.reviews.reviews.filter(
    (review) => review.exercise === id
  );
  if (reviews.length === 0) return null;
  return reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;
};

export const getAuthorByReviewId = (id) => (state) => {
  const review = state.reviews.reviews.find((review) => review._id === id);
  return state.users.users.find((user) => user._id === review.author);
};

export const isUpvotedByUserId = (reviewId, userId) => (state) => {
  const review = state.reviews.reviews.find(
    (review) => review._id === reviewId
  );
  if (!review) return false;
  return review.upvotes.includes(userId);
};

export const isDownvotedByUserId = (reviewId, userId) => (state) => {
  const review = state.reviews.reviews.find(
    (review) => review._id === reviewId
  );
  if (!review) return false;
  return review.downvotes.includes(userId);
};

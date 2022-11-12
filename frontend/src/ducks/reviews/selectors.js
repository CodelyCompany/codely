export const getReviewsByExerciseId = (id) => (state) => state.reviews.reviews.filter((review) => review.exercise === id);
export const getReviewsByUserId = (id) => (state) => state.reviews.reviews.filter((review) => review.user === id);
export const getRatingByExerciseId = (id) => (state) => {
    const reviews = state.reviews.reviews.filter((review) => review.exercise === id);
    if(reviews.length === 0) return null;
    return (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length);
};
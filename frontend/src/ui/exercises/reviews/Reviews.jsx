import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getReviewsByExerciseId } from '../../../ducks/reviews/selectors';
import { getUserByUsername } from '../../../ducks/user/selectors';

import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';

const Reviews = () => {
  const { id } = useParams();
  const { user } = useAuth0();
  const reviews = useSelector(getReviewsByExerciseId(id));
  const foundUser = useSelector(getUserByUsername(user.nickname));
  const [usersReview, setUsersReview] = useState(null);

  useEffect(() => {
    setUsersReview(reviews.find((review) => review.author === foundUser._id));
  }, [foundUser]);

  return (
    reviews && (
      <Box padding='20px'>
        <Typography variant='h4' marginBottom={3}>
          Reviews
        </Typography>
        <Box>
          <ReviewForm review={usersReview} />
        </Box>
        <Box>
          {reviews
            .filter(
              (review) =>
                review.author !== foundUser._id && review.comment !== ''
            )
            .map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
        </Box>
      </Box>
    )
  );
};

export default Reviews;

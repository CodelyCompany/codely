import React, { useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Typography } from '@mui/material';
import { getReviewsByExerciseId } from 'ducks/reviews/selectors';
import { getUserByUsername } from 'ducks/user/selectors';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReviewCard from 'ui/exercises/reviews/ReviewCard';
import ReviewForm from 'ui/exercises/reviews/ReviewForm';

const Reviews = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { user } = useAuth0();
  const reviews = useSelector(getReviewsByExerciseId(id));
  const foundUser = useSelector(getUserByUsername(user.nickname));
  const [usersReview, setUsersReview] = useState(null);
  const [reviewable, setReviewable] = useState(false);

  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary'
        : 'primary',
    [localStorage.getItem('theme')]
  );

  useEffect(() => {
    setUsersReview(reviews.find((review) => review.author === foundUser._id));
    setReviewable(
      foundUser && foundUser.doneExercises.find((ex) => ex._id === id)
    );
  }, [foundUser]);

  return (
    reviews && (
      <Box padding='20px'>
        <Typography
          variant='h4'
          color={color}
          fontWeight={'bolder'}
          marginBottom={3}
        >
          {t('Reviews')}
        </Typography>
        <Box>
          {reviewable ? (
            <ReviewForm review={usersReview} />
          ) : (
            <Typography variant='h6' textAlign='center' marginBottom={3}>
              {t('You need to solve the exercise before reviewing it')}
            </Typography>
          )}
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

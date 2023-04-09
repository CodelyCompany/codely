import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Typography } from '@mui/material';
import { getReviewsByExerciseId } from 'ducks/reviews/selectors';
import { getUserByUsername } from 'ducks/user/selectors';
import useTheme from 'helpers/useTheme';
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
  const { theme } = useTheme();

  useEffect(() => {
    setUsersReview(reviews.find((review) => review.author === foundUser._id));
    setReviewable(
      foundUser && foundUser.doneExercises.find((ex) => ex._id === id)
    );
  }, [foundUser]);

  return (
    reviews && (
      <Box id='review'>
        <Typography id='review-typography' variant='h4' color={theme}>
          {t('Reviews')}
        </Typography>
        <Box>
          {reviewable ? (
            <ReviewForm review={usersReview} />
          ) : (
            <Typography id='review-no-access' variant='h6'>
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
            .map((review, index) => (
              <ReviewCard key={review._id} review={review} index={index} />
            ))}
        </Box>
      </Box>
    )
  );
};

export default Reviews;

import React, { useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import ThumbUp from '@mui/icons-material/ThumbUp';
import { Grid, Rating, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { GetExercises } from 'ducks/exercises/operations';
import { getExercisesFromState } from 'ducks/exercises/selectors';
import { getReviewsByUserId } from 'ducks/reviews/selectors';
import { getToken } from 'ducks/token/selectors';
import { getUserByUsername } from 'ducks/user/selectors';
import useTheme from 'helpers/useTheme';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const WrittenReviews = () => {
  const { t } = useTranslation();
  const { user } = useAuth0();
  const navigate = useNavigate();
  const foundUser = useSelector(getUserByUsername(user.nickname));
  const reviews = useSelector(getReviewsByUserId(foundUser._id));
  const exercises = useSelector(getExercisesFromState);
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const { color } = useTheme();

  const getReviewStatus = (review) => review.editedAt ? t('edited-prefix') : t('created-prefix');

  const getReviewDate = (review) => review.editedAt ? review.editedAt : review.creationDate;

  useEffect(() => {
    dispatch(GetExercises(token));
  }, [dispatch]);

  return (
    <Box id='written-reviews'>
      <Typography variant='h6' color={color}>
        {t('written-reviews-listing-label')}
      </Typography>
      {reviews && exercises && exercises.length > 0
        ? reviews.map((review) => (
            <Grid
              key={review._id}
              container
              spacing={2}
              className='review-card'
            >
              <Grid item xs={6}>
                <Typography variant='h5'>
                  <span
                    className='exercise-link'
                    onClick={() => navigate(`/Exercise/${review.exercise}`)}
                  >
                    {exercises?.find((ex) => ex._id === review.exercise)?.title}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={6} className='rating'>
                <Rating value={review.rating} size='large' readOnly />
              </Grid>
              <Grid item xs={12}>
                <Typography>{review.comment}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Box display='flex'>
                  <ThumbUp color={color} />
                  <Typography color={color} marginLeft={1}>
                    {review.upvotes.length - review.downvotes.length}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography className='timestamp'>
                  {review
                    ? `${getReviewStatus(review)}
                        ${new Date(
                          getReviewDate(review)
                        ).toLocaleDateString()} ${t('at-word')}
                        ${new Date(
                          getReviewDate(review)
                        ).toLocaleTimeString()}`
                    : null}
                </Typography>
              </Grid>
            </Grid>
          ))
        : null}
    </Box>
  );
};

export default WrittenReviews;

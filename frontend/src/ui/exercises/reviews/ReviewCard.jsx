import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Box, Grid, Rating, Typography } from '@mui/material';
import { EditReview } from 'ducks/reviews/operations';
import {
  getAuthorByReviewId,
  isDownvotedByUserId,
  isUpvotedByUserId,
} from 'ducks/reviews/selectors';
import { getUserByUsername } from 'ducks/user/selectors';
import useToken from "helpers/useToken";
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

const ReviewCard = ({ review }) => {
  const { t } = useTranslation();
  const { user } = useAuth0();
  const { token } = useToken();
  const author = useSelector(getAuthorByReviewId(review._id));
  const localUser = useSelector(getUserByUsername(user.nickname));
  const upvoted = useSelector(isUpvotedByUserId(review._id, localUser._id));
  const downvoted = useSelector(isDownvotedByUserId(review._id, localUser._id));
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();

  useEffect(
    () => setRating(review.upvotes.length - review.downvotes.length),
    [review]
  );

  const handleVote = async (isUpvote) => {
    try {
      const body = isUpvote
        ? {
            ...review,
            upvotes: upvoted
              ? review.upvotes.filter((id) => id !== localUser._id)
              : [...review.upvotes, localUser._id],
            downvotes: review.downvotes.filter((id) => id !== localUser._id),
          }
        : {
            ...review,
            downvotes: downvoted
              ? review.downvotes.filter((id) => id !== localUser._id)
              : [...review.downvotes, localUser._id],
            upvotes: review.upvotes.filter((id) => id !== localUser._id),
          };

      dispatch(EditReview(body, token));
    } catch (e) {
      alert(t('Something went wrong, try again later'));
      console.log(e);
    }
  };

  return (
    <>
      <Grid container spacing={2} className='review-card'>
        <Grid item xs={6}>
          <Typography variant='h5' className='author'>
            {author.username}
          </Typography>
        </Grid>
        <Grid item xs={6} className='rating'>
          <Rating value={review.rating} size='large' readOnly />
        </Grid>
        <Grid item xs={12}>
          <Typography>{review.comment}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Box className='likes'>
            <ThumbUpIcon
              color={upvoted ? 'success' : 'disabled'}
              onClick={() => handleVote(true)}
              className='up'
            />
            <Typography color='primary'>{rating}</Typography>
            <ThumbDownIcon
              color={downvoted ? 'error' : 'disabled'}
              onClick={() => handleVote(false)}
              className='down'
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography className='timestamp'>
            {review
              ? `${review.editedAt ? t('Edited ') : t('Created ')}
                    ${new Date(
                      review.editedAt ? review.editedAt : review.creationDate
                    ).toLocaleDateString()} ${t('at')}
                    ${new Date(
                      review.editedAt ? review.editedAt : review.creationDate
                    ).toLocaleTimeString()}`
              : null}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default ReviewCard;

ReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
};

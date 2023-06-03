import React, { useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUp from '@mui/icons-material/ThumbUp';
import { Button, Grid, Rating, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { AddReview, EditReview } from 'ducks/reviews/operations';
import { getToken } from 'ducks/token/selectors';
import { getUserByUsername } from 'ducks/user/selectors';
import useTheme from 'helpers/useTheme';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ReviewForm = ({ review, token }) => {
  const { t } = useTranslation();
  const { user } = useAuth0();
  const [editing, setEditing] = useState(true);
  const [rating, setRating] = useState(null);
  const [upvotes, setUpvotes] = useState(null);
  const [comment, setComment] = useState('');
  const { id } = useParams();
  const localUser = useSelector(getUserByUsername(user.nickname));
  const dispatch = useDispatch();

  const { theme } = useTheme();

  useEffect(() => {
    if (review) {
      setEditing(false);
      setComment(review.comment);
      setRating(review.rating);
      setUpvotes(review.upvotes.length - review.downvotes.length);
    }
  }, [review]);

  const handleSubmit = async () => {
    if (!rating) {
      alert(t('excercise-rating-requirement-warning'));
      return;
    }

    if (comment.length > 5000) {
      alert(t('comment-max-length-warning'));
      return;
    }

    try {
      const body = review
        ? {
            ...review,
            rating,
            comment,
          }
        : {
            author: localUser._id,
            exercise: id,
            rating,
            comment,
          };

      if (review) dispatch(EditReview(body, token));
      else dispatch(AddReview(body, token));

      setEditing(false);
    } catch (e) {
      alert(t('try-later-message'));
      console.log(e);
    }
  };

  return (
    <Grid container spacing={2} className='review-card'>
      <Grid item xs={6}>
        <Typography variant='h5' className='author' id={'comment-author'}>
          {user.nickname}
        </Typography>
      </Grid>
      <Grid item xs={6} className='rating'>
        <Rating
          id={'comment-rating'}
          value={rating}
          onChange={(_, newRating) => {
            setRating(newRating);
          }}
          size='large'
          readOnly={!editing}
        />
      </Grid>
      <Grid item xs={12}>
        {editing ? (
          <TextField
            id={'comment-input'}
            color={theme}
            label={t('comment-label')}
            variant='outlined'
            multiline
            fullWidth
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
        ) : (
          <Typography id={'comment-text'}>{comment}</Typography>
        )}
      </Grid>
      <Grid item xs={5}>
        <Box display={upvotes ? 'flex' : 'none'}>
          <ThumbUp color={theme} />
          <Typography id={'comment-votes'} color={theme} marginLeft={1}>
            {upvotes}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Button
          id={'edit-button'}
          color={theme}
          variant='contained'
          onClick={editing ? handleSubmit : () => setEditing(true)}
        >
          {editing ? <AddIcon /> : <EditIcon />}
        </Button>
      </Grid>
      <Grid item xs={5}>
        <Typography className='timestamp'>
          {review
            ? `${review.editedAt ? t('edited-prefix') : t('created-prefix')}
                    ${new Date(
                      review.editedAt ? review.editedAt : review.creationDate
                    ).toLocaleDateString()} ${t('at-word')}
                    ${new Date(
                      review.editedAt ? review.editedAt : review.creationDate
                    ).toLocaleTimeString()}`
            : null}
        </Typography>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  token: getToken(state),
});

export default connect(mapStateToProps)(ReviewForm);

ReviewForm.propTypes = {
  review: PropTypes.object,
  token: PropTypes.string,
};

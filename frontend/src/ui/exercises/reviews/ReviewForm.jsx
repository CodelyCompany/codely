import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Grid, Rating, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AddReview, EditReview } from '../../../ducks/reviews/operations';
import { getUserByUsername } from '../../../ducks/user/selectors';

const ReviewForm = ({ review }) => {

    const { user, getAccessTokenSilently } = useAuth0();
    const [editing, setEditing] = useState(true);
    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState('');
    const { id } = useParams();
    const localUser = useSelector(getUserByUsername(user.nickname));
    const dispatch = useDispatch();

    useEffect(() => {
        if(review) {
            setEditing(false);
            setComment(review.comment);
            setRating(review.rating);
        }
    }, [review]);

    const handleSubmit = async () => {

        if(!rating) {
            alert('You need to rate the exercise!');
            return;
        }

        if(comment.length > 5000) {
            alert('Your comment is too long! (5000 characters limit)');
            return;
        }

        try {
            const token = await getAccessTokenSilently({
                audience: `${
                process.env.REACT_APP_BACKEND || 'http://localhost:5000'
                }`,
            });

            const body = review ? {
                ...review,
                rating,
                comment,
            } : {
                author: localUser._id,
                exercise: id,
                rating,
                comment,
            };

            if(review) dispatch(EditReview(body, token));
            else dispatch(AddReview(body, token));

            setEditing(false);
        } catch (e) {
            alert('Something went wrong, try again later');
            console.log(e);
        }
    };

    return (
        <Grid container spacing={2} className='review-card'>
            <Grid item xs={6}>
                <Typography variant='h5' className='author'>
                    {user.nickname}
                </Typography>
            </Grid>
            <Grid item xs={6} className='rating'>
                <Rating
                    value={rating}
                    onChange={(_, newRating) => { setRating(newRating); }}
                    size='large'
                    readOnly={!editing}
                />
            </Grid>
            <Grid item xs={12}>
            {
                editing ?
                <TextField
                    label='Comment' variant='outlined' multiline
                    fullWidth value={comment}
                    onChange={(e) => { setComment(e.target.value); }}
                /> :
                <Typography>
                    {comment}
                </Typography>
            }
            </Grid>
            <Grid item xs={5}>
                <Typography color='primary'>
                    {review ? review.upvotes.length - review.downvotes.length : null}
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Button color='primary' variant='contained' onClick={editing ? handleSubmit : () => setEditing(true)}>
                    {editing ? <AddIcon /> : <EditIcon />}
                </Button>
            </Grid>
            <Grid item xs={5}>
                <Typography className='timestamp'>
                    {review ? `${review.editedAt ? 'Edited ' : 'Created '}
                    ${new Date(review.editedAt ? review.editedAt : review.creationDate).toLocaleDateString()} at
                    ${new Date(review.editedAt ? review.editedAt : review.creationDate).toLocaleTimeString()}` : null}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default ReviewForm;

ReviewForm.propTypes = {
    review: PropTypes.object,
};

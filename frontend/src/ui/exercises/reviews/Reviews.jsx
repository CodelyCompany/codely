import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getReviewsByExerciseId } from '../../../ducks/reviews/selectors';
import { getUserByUsername } from '../../../ducks/user/selectors';

import ReviewCard from './ReviewCard';

const Reviews = () => {

    const { exercise_id } = useParams();
    const { user } = useAuth0();
    const foundUser = useSelector(getUserByUsername(user.nickname));
    const reviews = useSelector(getReviewsByExerciseId(exercise_id));
    const dispatch = useDispatch();
    const [usersReview, setUsersReview] = useState(null);

    useEffect(() => {
        setUsersReview(reviews.find((review) => review.author == foundUser._id));
    }, [reviews, foundUser]);

    return (
        reviews &&
        <Box>
            <Box>
                <Box>RATING</Box>
                <Box>
                    <Typography variant='h6'>
                        Your review
                    </Typography>
                    USER REVIEW / FORM
                </Box>
            </Box>
            <Box>
                {
                    reviews
                    .filter((review) => review.author != foundUser._id)
                    .map((review) => <ReviewCard key={review._id} review={review}/>)
                }
            </Box>
        </Box>
    );
};

export default Reviews;
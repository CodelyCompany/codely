import React from 'react';

import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PropTypes from 'prop-types';

const ReviewCard = ({ review }) => {

    const xd = 'xd';

    return (
        <Card>
            <CardContent>
                <Typography>
                    {review.comment}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ReviewCard;

ReviewCard.propTypes = {
    review: PropTypes.object.isRequired,
};

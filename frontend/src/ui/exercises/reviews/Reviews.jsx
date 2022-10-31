import React from 'react';

import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

const Reviews = () => {
    const { id } = useParams();
    return (
        <Box>
            <Box>
                <Box>Score</Box>
                <Box>Your review</Box>
            </Box>
            <Box>Other reviews</Box>
        </Box>
    );
};

export default Reviews;
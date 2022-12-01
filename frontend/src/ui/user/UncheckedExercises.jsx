import React from 'react';

import { Box, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';

function UncheckedExercises({ exercises }) {
  return (
    <Box
      sx={{
        borderColor: 'primary.main',
        borderBottom: '3px solid',
        margin: '10px 0',
        padding: '10px 0',
        width: '100%',
      }}
    >
      <Typography color='primary' variant='h6' sx={{ fontWeight: 'bolder' }}>
        Exercises waiting for admin approval: {exercises.length}
      </Typography>
    </Box>
  );
}

export default UncheckedExercises;

UncheckedExercises.propTypes = {
  exercises: PropTypes.array,
};

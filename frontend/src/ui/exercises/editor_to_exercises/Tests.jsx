import React from 'react';

import { Box, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';

function Tests({ tests }) {
  return (
    <Box
      sx={{
        width: 'calc(100% - 6px)',
        border: '3px solid rgb(25, 118, 210)',
        marginTop: '10px',
        padding: '10px 0',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant='h6'
        color='primary'
        sx={{ marginRight: '3px', fontWeight: 'bolder' }}
      >
        Tests passed:
      </Typography>
      <Typography
        variant='h6'
        sx={{ color: tests.correct === tests.tests ? 'green' : 'red' }}
      >
        {tests.correct} / {tests.tests}
      </Typography>
    </Box>
  );
}

export default Tests;

Tests.propTypes = {
  tests: PropTypes.object.isRequired,
};

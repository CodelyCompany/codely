import React from 'react';

import { Box, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';

const SectionWrapper = ({ children, mode, condition }) => {
  const info = () => {
    if (mode === 'reviews') return "You didn't write any reviews";
    if (mode === 'done') return "You didn't finish any exercises";
    return "You didn't prepare any exercises";
  };

  return condition ? (
    children
  ) : (
    <Box
      sx={{
        borderBottom: '3px solid rgb(25, 118, 210)',
        margin: '10px 0',
        padding: '10px 0',
        width: '100%',
      }}
    >
      <Typography sx={{ fontWeight: 'bolder' }} color='primary' variant='h6'>
        {info()}
      </Typography>
    </Box>
  );
};

export default SectionWrapper;

SectionWrapper.propTypes = {
  children: PropTypes.element,
  mode: PropTypes.string.isRequired,
  condition: PropTypes.bool.isRequired,
};
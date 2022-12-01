import React from 'react';

import { Box, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';

const SectionWrapper = ({ children, mode, condition }) => {
  const info = () => {
    if (mode === 'reviews') return "You didn't write any reviews";
    if (mode === 'done') return "You didn't finish any exercises";
    if (mode === 'unchecked')
      return "You don't have any exercises waiting for approval";
    if (mode === 'versus') return "You didn't play any versuses";
    return "You didn't prepare any exercises";
  };

  return condition ? (
    children
  ) : (
    <Box
      sx={{
        borderColor: 'primary.main',
        borderBottom: '3px solid',
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
  children: PropTypes.node,
  mode: PropTypes.string.isRequired,
  condition: PropTypes.bool.isRequired,
};

import React from 'react';

import { Box, Typography } from '@mui/material';
import useTheme from 'helpers/useTheme';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';

const SectionWrapper = ({ children, mode, condition }) => {
  const { t } = useTranslation();
  const { color } = useTheme();

  const info = () => {
    if (mode === 'reviews') return t('no-created-reviews-message');
    if (mode === 'done') return t('no-finished-exercises-message');
    if (mode === 'unchecked')
      return t('no-exercises-in-verfication-message');
    if (mode === 'versus') return t('no-versus-played-message');
    return t('no-prepared-exercises-message');
  };

  return condition ? (
    children
  ) : (
    <Box className='user-section-wrapper' sx={{ borderColor: color }}>
      <Typography sx={{ color }} variant='h6'>
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

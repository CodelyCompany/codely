import React from 'react';

import { Box, Typography } from '@mui/material';
import useTheme from 'helpers/useTheme';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';

const SectionWrapper = ({ children, mode, condition }) => {
  const { t } = useTranslation();
  const { color } = useTheme();

  const info = () => {
    if (mode === 'reviews') return t("You didn't write any reviews");
    if (mode === 'done') return t("You didn't finish any exercises");
    if (mode === 'unchecked')
      return t("You don't have any exercises waiting for approval");
    if (mode === 'versus') return t("You didn't play any versuses");
    return t("You didn't prepare any exercises");
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

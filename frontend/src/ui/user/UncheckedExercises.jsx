import React from 'react';

import { Box, Typography } from '@mui/material';
import useTheme from 'helpers/useTheme';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';

function UncheckedExercises({ exercises }) {
  const { t } = useTranslation();
  const { color } = useTheme();

  return (
    <Box className='user-section-wrapper' sx={{ borderColor: color }}>
      <Typography variant='h6' sx={{ color }}>
        {t('Exercises waiting for admin approval:')} {exercises.length}
      </Typography>
    </Box>
  );
}

export default UncheckedExercises;

UncheckedExercises.propTypes = {
  exercises: PropTypes.array,
};

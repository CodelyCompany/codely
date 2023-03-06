import React, { useMemo } from 'react';

import { Box, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';

function UncheckedExercises({ exercises }) {
  const { t } = useTranslation();
  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary.main'
        : 'primary.main',
    [localStorage.getItem('theme')]
  );

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

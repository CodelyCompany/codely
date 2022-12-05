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
    <Box
      sx={{
        borderColor: color,
        borderBottom: '3px solid',
        margin: '10px 0',
        padding: '10px 0',
        width: '100%',
      }}
    >
      <Typography variant='h6' sx={{ fontWeight: 'bolder', color }}>
        {t('Exercises waiting for admin approval:')} {exercises.length}
      </Typography>
    </Box>
  );
}

export default UncheckedExercises;

UncheckedExercises.propTypes = {
  exercises: PropTypes.array,
};

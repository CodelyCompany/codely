import React, { useMemo } from 'react';

import { Box, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';

import ConfettiAfterSolve from '../../popups/ConfettiAfterSolve';

function Tests({ tests }) {
  const { t } = useTranslation();
  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary.main'
        : 'primary.main',
    [localStorage.getItem('theme')]
  );

  return (
    <>
      {tests.correct === tests.tests && <ConfettiAfterSolve />}
      <Box
        sx={{
          width: 'calc(100% - 6px)',
          borderColor: color,
          border: '3px solid',
          marginTop: '10px',
          padding: '10px 0',
          borderRadius: '5px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant='h6'
          sx={{ marginRight: '3px', fontWeight: 'bolder', color }}
        >
          {t('Tests passed: ')}
        </Typography>
        <Typography
          variant='h6'
          sx={{ color: tests.correct === tests.tests ? 'green' : 'red' }}
        >
          {tests.correct} / {tests.tests}
        </Typography>
      </Box>
    </>
  );
}

export default Tests;

Tests.propTypes = {
  tests: PropTypes.object.isRequired,
};

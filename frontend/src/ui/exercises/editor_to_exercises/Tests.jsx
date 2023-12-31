import React from 'react';

import { Box, Typography } from '@mui/material';
import useTheme from 'helpers/useTheme';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import ConfettiAfterSolve from 'ui/popups/ConfettiAfterSolve';

function Tests({ tests }) {
  const { t } = useTranslation();
  const { color } = useTheme();

  return (
    <>
      {tests.correct === tests.tests && <ConfettiAfterSolve />}
      <Box id='tests-wrapper' sx={{ borderColor: color }}>
        <Typography id='tests-text' variant='h6' sx={{ color }}>
          {t('passed-tests-label')}
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

import React from 'react';

import { Box, Button, Typography } from '@mui/material';
import useTheme from 'helpers/useTheme';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Forbidden = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate('/');
  };

  const { color } = useTheme();

  return (
    <Box id='forbidden-page-container'>
      <Typography id='forbidden-page-typography' variant='h4' style={{ color }}>
        {t('access-denied-message')}
      </Typography>
      <Button
        id='return-button'
        onClick={goToMainPage}
        variant='contained'
        sx={{ color }}
      >
        {t('return-home-label')}
      </Button>
    </Box>
  );
};

export default Forbidden;

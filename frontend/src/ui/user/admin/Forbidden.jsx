import React from 'react';

import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Forbidden = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate('/');
  };

  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary.main'
        : 'primary.main',
    [localStorage.getItem('theme')]
  );

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography
        variant='h4'
        style={{ fontWeight: 'bolder', marginTop: '30px', color }}
      >
        {t(`You don't have permissions to view this page!`)}
      </Typography>
      <Button
        onClick={goToMainPage}
        variant='contained'
        sx={{ marginTop: '20px', color }}
      >
        {t('Back to the main page')}
      </Button>
    </Box>
  );
};

export default Forbidden;

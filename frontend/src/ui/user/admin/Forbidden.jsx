import React from 'react';

import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Forbidden = () => {
  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography
        variant='h4'
        color='primary'
        style={{ fontWeight: 'bolder', marginTop: '30px' }}
      >{`You don't have permissions to view this page!`}</Typography>
      <Button
        onClick={goToMainPage}
        color='primary'
        variant='contained'
        sx={{ marginTop: '20px' }}
      >
        Back to the main page
      </Button>
    </Box>
  );
};

export default Forbidden;

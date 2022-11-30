import React, { useState } from 'react';

import { Box, Checkbox, Container, Paper, Typography } from '@mui/material';

const Settings = () => {
  const [color, setColor] = useState(0);

  const changeColor = (e) => {
    setColor(parseInt(e.target.value));
  };

  return (
    <Container sx={{ marginTop: '20px' }}>
      <Box padding='20px'>
        <Typography color='primary' variant='h5' fontWeight='bolder'>
          Upload your avatar
        </Typography>
      </Box>
      <Box padding='20px' borderTop='3px solid rgb(25, 118, 210)'>
        <Typography color='primary' variant='h5' fontWeight='bolder'>
          Set your language
        </Typography>
      </Box>
      <Box padding='20px' borderTop='3px solid rgb(25, 118, 210)'>
        <Typography color='primary' variant='h5' fontWeight='bolder'>
          Set your theme
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Checkbox
            value={0}
            checked={color === 0}
            onChange={changeColor}
            name='color-0'
            sx={{ position: 'relative', bottom: '9px' }}
          />
          <Typography fontWeight='bolder'>Default</Typography>
          <Paper
            elevation={3}
            sx={{ height: '20px', width: '20px', marginLeft: '10px' }}
          >
            <Box
              sx={{
                height: '50%',
                backgroundColor: 'rgb(25, 118, 210)',
                borderRadius: '5px 5px 0 0',
              }}
            ></Box>
            <Box sx={{ height: '50%' }}></Box>
          </Paper>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Checkbox
            value={1}
            name='color-1'
            checked={color === 1}
            onChange={changeColor}
            sx={{ position: 'relative', bottom: '9px' }}
          />
          <Typography fontWeight='bolder'>Black / Blue</Typography>
          <Paper
            elevation={3}
            sx={{ height: '20px', width: '20px', marginLeft: '10px' }}
          >
            <Box
              sx={{
                height: '50%',
                backgroundColor: 'rgb(25, 118, 210)',
                borderRadius: '5px 5px 0 0',
              }}
            ></Box>
            <Box
              sx={{
                height: '50%',
                backgroundColor: 'rgb(89, 89, 88)',
                borderRadius: '0 0 5px 5px',
              }}
            ></Box>{' '}
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default Settings;

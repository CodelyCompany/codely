import React, { useEffect, useMemo, useState } from 'react';

import { Box, Checkbox, Typography } from '@mui/material';
import i18n from 'i18next';

const SetLanguage = () => {
  const [language, setLanguage] = useState('eng');

  useEffect(() => {
    setLanguage(i18n.language);
  }, []);

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
    setLanguage(e.target.value);
  };

  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary'
        : 'primary',
    [localStorage.getItem('theme')]
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Checkbox
          color={color}
          value='eng'
          checked={language === 'eng'}
          onClick={changeLanguage}
        />
        <Typography
          fontWeight='bolder'
          color={color}
          sx={{ position: 'relative', top: '10px' }}
        >
          English
        </Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Checkbox
          color={color}
          value='pl'
          checked={language === 'pl'}
          onClick={changeLanguage}
        />
        <Typography
          fontWeight='bolder'
          color={color}
          sx={{ position: 'relative', top: '10px' }}
        >
          Polish
        </Typography>
      </Box>
    </Box>
  );
};

export default SetLanguage;

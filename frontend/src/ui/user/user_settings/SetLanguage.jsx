import React, { useEffect, useState } from 'react';

import { Box, Checkbox, Typography } from '@mui/material';
import useTheme from 'helpers/useTheme';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

const SetLanguage = () => {
  const [language, setLanguage] = useState('eng');
  const { t } = useTranslation();

  useEffect(() => {
    setLanguage(i18n.language);
  }, []);

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
    setLanguage(e.target.value);
  };

  const { theme } = useTheme();

  return (
    <Box id='set-language-container'>
      <Box>
        <Checkbox
          color={theme}
          value='eng'
          checked={language === 'eng'}
          onClick={changeLanguage}
        />
        <Typography className='set-language-typography' color={theme}>
          {t('English')}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Checkbox
          color={theme}
          value='pl'
          checked={language === 'pl'}
          onClick={changeLanguage}
        />
        <Typography className='set-language-typography' color={theme}>
          {t('Polish')}
        </Typography>
      </Box>
    </Box>
  );
};

export default SetLanguage;

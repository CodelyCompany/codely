import React, { useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Checkbox, Container, Typography } from '@mui/material';
import { getToken } from 'ducks/token/selectors';
import { UpdateUser, UploadAvatar } from 'ducks/user/operations';
import { getUserByUsername } from 'ducks/user/selectors';
import usePageTitle from 'helpers/usePageTitle';
import useTheme from 'helpers/useTheme';
import * as _ from 'lodash';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';
import SetLanguage from 'ui/user/user_settings/SetLanguage';
import UploadDialog from 'ui/user/user_settings/UploadDialog';

import Pages from 'consts/pages';

const Settings = ({ UpdateUser, UploadAvatar, token }) => {
  const { t } = useTranslation();
  const [color, setColor] = useState(0);
  const [image, setImage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useAuth0();
  const { theme } = useTheme();
  const foundUser = useSelector(getUserByUsername(user.nickname));
  usePageTitle(Pages.SETTINGS);

  useEffect(() => {
    if (!_.isEmpty(user)) {
      setColor(foundUser?.theme ?? 0);
      document.body.className = `theme-${foundUser?.theme ?? 0}`;
    }
  }, [user, foundUser]);

  const changeColor = (e) => {
    localStorage.setItem('theme', e.target.value);
    UpdateUser({ _id: foundUser._id, theme: parseInt(e.target.value) }, token);
  };

  const handleNewImage = (event) => {
    setImage(event.target.files[0]);
    setDialogOpen(true);
  };

  const handleUploadAbort = () => {
    setImage(null);
    setDialogOpen(false);
  };

  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append('avatar', image, image.name);
    UploadAvatar(foundUser._id, formData, token);
    setDialogOpen(false);
  };

  return (
    <Container id='settings-container'>
      <UploadDialog
        open={dialogOpen}
        handleAbort={handleUploadAbort}
        handleUpload={handleImageUpload}
      />
      <Box id='upload-avatar'>
        <Typography id='upload-avatar-typography' color={theme} variant='h5'>
          {t('upload-avatar-label')}
        </Typography>
        <Button variant='contained' color={theme} component='label'>
          {t('file-choice-request')}
          <input type='file' hidden onChange={handleNewImage} />
        </Button>
      </Box>
      <Box id='set-language' color={theme}>
        <Typography id='set-language-typography' color={theme} variant='h5'>
          {t('set-language-label')}
        </Typography>
        <SetLanguage />
      </Box>
      <Box id={'theme-container'} className='theme-container' color={theme}>
        <Typography id='set-theme' color={theme} variant='h5'>
          {t('set-theme-label')}
        </Typography>
        <Box className='theme-option-picker'>
          <Checkbox
            color={theme}
            value={0}
            checked={color === 0}
            onChange={changeColor}
            name='color-0'
          />
          <Typography>{t('theme-white-magenta-label')}</Typography>
          <div>
            <Box className='magenta-option' />
            <Box className='white-option' />
          </div>
        </Box>
        <Box className='theme-option-picker'>
          <Checkbox
            color={theme}
            value={1}
            name='color-1'
            checked={color === 1}
            onChange={changeColor}
          />
          <Typography>{t('theme-black-magenta-label')}</Typography>
          <div>
            <Box className='magenta-option' />
            <Box className='black-option' />
          </div>
        </Box>
        <Box className='theme-option-picker'>
          <Checkbox
            color={theme}
            value={2}
            name='color-2'
            checked={color === 2}
            onChange={changeColor}
          />
          <Typography>{t('theme-white-blue-label')}</Typography>
          <div>
            <Box className='blue-option' />
            <Box className='white-option' />
          </div>
        </Box>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  token: getToken(state),
});

const mapDispatchToProps = {
  UpdateUser,
  UploadAvatar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

Settings.propTypes = {
  UpdateUser: PropTypes.func.isRequired,
  UploadAvatar: PropTypes.func.isRequired,
  token: PropTypes.object,
};

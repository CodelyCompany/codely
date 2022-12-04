import React, { useState } from 'react';
import { useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Checkbox, Container, Paper, Typography } from '@mui/material';
import * as _ from 'lodash';
import { PropTypes } from 'prop-types';
import { connect, useSelector } from 'react-redux';

import { getToken } from '../../../ducks/token/selectors';
import { UpdateUser } from '../../../ducks/user/operations';
import { UploadAvatar } from '../../../ducks/user/operations';
import { getUserByUsername } from '../../../ducks/user/selectors';

import SetLanguage from './SetLanguage';
import UploadDialog from './UploadDialog';

const Settings = ({ UpdateUser, UploadAvatar, token }) => {
  const [color, setColor] = useState(0);
  const [image, setImage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useAuth0();
  const colorOpt = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary'
        : 'primary',
    [localStorage.getItem('theme')]
  );
  const foundUser = useSelector(getUserByUsername(user.nickname));

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
    <Container sx={{ marginTop: '20px' }}>
      <UploadDialog
        open={dialogOpen}
        handleAbort={handleUploadAbort}
        handleUpload={handleImageUpload}
      />
      <Box padding='20px'>
        <Typography color={colorOpt} variant='h5' fontWeight='bolder'>
          Upload your avatar
        </Typography>
        <Button variant='contained' color={colorOpt} component='label'>
          {'Choose file (.png)'}
          <input type='file' hidden onChange={handleNewImage} />
        </Button>
      </Box>
      <Box padding='20px' color={colorOpt} borderTop='3px solid'>
        <Typography color={colorOpt} variant='h5' fontWeight='bolder'>
          Set your language
        </Typography>
        <SetLanguage />
      </Box>
      <Box padding='20px' color={colorOpt} borderTop='3px solid'>
        <Typography color={colorOpt} variant='h5' fontWeight='bolder'>
          Set your theme
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Checkbox
            color={colorOpt}
            value={0}
            checked={color === 0}
            onChange={changeColor}
            name='color-0'
            sx={{ position: 'relative', bottom: '9px' }}
          />
          <Typography fontWeight='bolder'>White & Magenta</Typography>
          <div style={{ height: '20px', width: '20px', marginLeft: '10px' }}>
            <Box
              sx={{
                height: '50%',
                backgroundColor: '#9a2150',
                borderRadius: '5px 5px 0 0',
              }}
            ></Box>
            <Box
              sx={{
                height: '50%',
                backgroundColor: 'white',
                borderRadius: '0 0 5px 5px',
              }}
            ></Box>
          </div>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Checkbox
            color={colorOpt}
            value={1}
            name='color-1'
            checked={color === 1}
            onChange={changeColor}
            sx={{ position: 'relative', bottom: '9px' }}
          />
          <Typography fontWeight='bolder'>Black & Magenta</Typography>
          <div style={{ height: '20px', width: '20px', marginLeft: '10px' }}>
            <Box
              sx={{
                height: '50%',
                backgroundColor: '#9a2150',
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
          </div>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Checkbox
            color={colorOpt}
            value={2}
            name='color-2'
            checked={color === 2}
            onChange={changeColor}
            sx={{ position: 'relative', bottom: '9px' }}
          />
          <Typography fontWeight='bolder'>White & Blue</Typography>
          <div style={{ height: '20px', width: '20px', marginLeft: '10px' }}>
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
                backgroundColor: 'white',
                borderRadius: '0 0 5px 5px',
              }}
            ></Box>
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

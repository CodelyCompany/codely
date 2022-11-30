import React, { useState } from 'react';
import { useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Checkbox, Container, Paper, Typography } from '@mui/material';
import * as _ from 'lodash';
import { PropTypes } from 'prop-types';
import { connect, useSelector } from 'react-redux';

import { getToken } from '../../../ducks/token/selectors';
import { UpdateUser } from '../../../ducks/user/operations';
import { getUserByUsername } from '../../../ducks/user/selectors';

const Settings = ({ UpdateUser, token }) => {
  const [color, setColor] = useState(0);
  const { user } = useAuth0();

  const foundUser = useSelector(getUserByUsername(user.nickname));

  useEffect(() => {
    if (!_.isEmpty(user)) {
      setColor(foundUser.theme);
      document.body.className = `theme-${foundUser.theme}`;
    }
  }, [user, foundUser.theme]);

  const changeColor = (e) => {
    UpdateUser({ _id: foundUser._id, theme: parseInt(e.target.value) }, token);
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
          <Typography fontWeight='bolder'>Black & Blue</Typography>
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

const mapStateToProps = (state) => ({
  token: getToken(state),
});

const mapDispatchToProps = {
  UpdateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

Settings.propTypes = {
  UpdateUser: PropTypes.func.isRequired,
  token: PropTypes.object,
};

import React, { useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getSocket } from '../../../ducks/socket/selectors';
import { getToken } from '../../../ducks/token/selectors';
import { getUserByUsername } from '../../../ducks/user/selectors';
import SubmitAlert from '../../popups/SubmitAlert';
import GetToken from '../../user/GetToken';

const Buttons = ({ socket, code, won, token }) => {
  const { user } = useAuth0();
  const { roomId, id } = useParams();
  const [triggered, setTriggered] = useState(false);
  const foundUser = useSelector(getUserByUsername(user.nickname));
  const [passed, setPassed] = useState(false);

  const finishEx = () => {
    axios
      .put(
        `${process.env.REACT_APP_BACKEND}/exercises/checkVersus/${id}/room/${roomId}`,
        {
          user: foundUser._id,
          won,
          solution: code,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.tests === response.data.correct) {
          setPassed(true);
          setTriggered(true);
          socket.emit('game-finished', roomId);
          return;
        }
        setPassed(false);
        setTriggered(true);
      });
  };

  return (
    <>
      <GetToken />
      <SubmitAlert
        triggered={triggered}
        setTriggered={setTriggered}
        passed={passed}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '10px 0',
        }}
      >
        <Button variant="contained">Run</Button>
        <Button variant="contained" onClick={finishEx}>
          Submit
        </Button>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  socket: getSocket(state),
  token: getToken(state),
});

export default connect(mapStateToProps)(Buttons);

Buttons.propTypes = {
  socket: PropTypes.object,
  code: PropTypes.string.isRequired,
  won: PropTypes.bool.isRequired,
  token: PropTypes.string,
};

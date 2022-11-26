import React, { useEffect, useState } from 'react';

import { Box, Button, Container, Typography } from '@mui/material';
import * as _ from 'lodash';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { io } from 'socket.io-client';

import { ConnectSocket, DisconnectSocket } from '../../ducks/socket/actions';
import { getSocket } from '../../ducks/socket/selectors';

import PlayersCounter from './PlayersCounter';
import SearchingGame from './SearchingGame';

const Versus = ({ socket, ConnectSocket, DisconnectSocket }) => {
  const [dots, setDots] = useState(0);
  const [time, setTime] = useState(0);
  const [found, setFound] = useState(null);

  const connect = () => {
    const socket = io('http://localhost:5002/');
    ConnectSocket(socket);
    setTime(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === 3) return 0;
        return prev + 1;
      });
      setTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const disconnect = () => {
    socket.disconnect();
    DisconnectSocket();
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      {socket && <PlayersCounter socket={socket} />}
      {socket && (
        <SearchingGame
          socket={socket}
          setFound={setFound}
          found={found}
          DisconnectSocket={DisconnectSocket}
        />
      )}
      {!socket && (
        <Button
          sx={{ marginTop: '20px' }}
          fullWidth
          onClick={() => connect()}
          variant="contained"
        >
          Find opponent
        </Button>
      )}
      {socket && (
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '5px',
            }}
          >
            <Typography color="primary">
              Searching{[...Array(dots).keys()].map(() => '.')}{' '}
            </Typography>
            <Typography color="primary">
              {Math.floor(time / 60)}:
              {time % 60 < 10 ? '0' + (time % 60) : time % 60}
            </Typography>
          </Box>
          <Button
            sx={{ marginTop: '20px' }}
            fullWidth
            onClick={() => disconnect()}
            variant="contained"
          >
            Leave queue
          </Button>
        </Box>
      )}{' '}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  socket: getSocket(state),
});

const mapDispatchToProps = {
  ConnectSocket,
  DisconnectSocket,
};

export default connect(mapStateToProps, mapDispatchToProps)(Versus);

Versus.propTypes = {
  socket: PropTypes.object,
  ConnectSocket: PropTypes.func.isRequired,
  DisconnectSocket: PropTypes.func.isRequired,
};

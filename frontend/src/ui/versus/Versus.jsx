import React, { useEffect, useMemo, useState } from 'react';

import { Box, Button, Container, Typography } from '@mui/material';
import { ConnectSocket, DisconnectSocket } from 'ducks/socket/actions';
import { getSocket } from 'ducks/socket/selectors';
import { useFormik } from 'formik';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { io } from 'socket.io-client';
import ChooseExerciseLang from 'ui/versus/ChooseExerciseLang';
import PlayersCounter from 'ui/versus/PlayersCounter';
import ProgrammingQuotes from 'ui/versus/ProgrammingQuotes';
import SearchingGame from 'ui/versus/SearchingGame';
import * as yup from 'yup';

const Versus = ({ socket, ConnectSocket, DisconnectSocket }) => {
  const [dots, setDots] = useState(0);
  const [time, setTime] = useState(0);
  const [found, setFound] = useState(null);
  const { t } = useTranslation();

  const validateVersusLanguages = yup.object({
    checked: yup
      .array()
      .of(yup.string())
      .min(1, t('You have to pick at least one language')),
  });

  const formik = useFormik({
    initialValues: {
      checked: [],
    },
    validationSchema: validateVersusLanguages,
    onSubmit: (values) => {
      const socket = io(
        `${import.meta.env.REACT_APP_WEBSOCKET_ADDRESS}` ||
          'http://localhost:5002/',
        {
          reconnection: true,
          transports: ['websocket'],
        }
      );
      socket.io.opts.path = '/websocket/socket.io';
      ConnectSocket(socket);
      socket.emit(
        'game-preferences',
        JSON.stringify({
          languages: values.checked,
        })
      );
      setTime(0);
    },
  });

  const connect = () => {
    formik.submitForm();
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
  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary'
        : 'primary',
    [localStorage.getItem('theme')]
  );
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      {!socket && <ChooseExerciseLang formik={formik} />}
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
        <>
          <Button
            color={color}
            sx={{ marginTop: '20px' }}
            fullWidth
            onClick={() => connect()}
            variant='contained'
          >
            {t('Find opponent')}
          </Button>
          <ProgrammingQuotes />
        </>
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
            <Typography color={color}>
              {t('Searching')}
              {[...Array(dots).keys()].map(() => '.')}{' '}
            </Typography>
            <Typography color={color}>
              {Math.floor(time / 60)}:
              {time % 60 < 10 ? '0' + (time % 60) : time % 60}
            </Typography>
          </Box>
          <Button
            color={color}
            sx={{ marginTop: '20px' }}
            fullWidth
            onClick={() => disconnect()}
            variant='contained'
          >
            {t('Leave queue')}
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

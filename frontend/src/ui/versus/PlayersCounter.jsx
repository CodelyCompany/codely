import React, { useEffect, useMemo, useState } from 'react';

import { Box, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';

const PlayersCounter = ({ socket }) => {
  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary'
        : 'primary',
    [localStorage.getItem('theme')]
  );
  const [players, setPlayers] = useState(0);
  useEffect(() => {
    socket.on('players', (mess) => {
      setPlayers(mess);
    });

    return () => {
      socket.off('players');
    };
  }, []);

  return (
    <Box>
      <Typography
        variant='h3'
        color={color}
        sx={{
          fontWeight: 'bolder',
          borderColor: 'primary.main',
          borderBottom: '3px solid',
          marginTop: '20px',
        }}
      >
        Waiting for opponent
      </Typography>
      <Typography variant='h4' color={color} fontWeight={'bolder'}>
        Active players: {players}
      </Typography>
    </Box>
  );
};

export default PlayersCounter;

PlayersCounter.propTypes = {
  socket: PropTypes.object,
};

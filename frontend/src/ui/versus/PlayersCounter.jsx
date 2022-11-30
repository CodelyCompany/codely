import React, { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';

const PlayersCounter = ({ socket }) => {
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
        color='primary'
        sx={{
          fontWeight: 'bolder',
          borderBottom: '3px solid rgb(25, 118, 210)',
          marginTop: '20px',
        }}
      >
        Waiting for opponent
      </Typography>
      <Typography variant='h4' color='primary' fontWeight={'bolder'}>
        Active players: {players}
      </Typography>
    </Box>
  );
};

export default PlayersCounter;

PlayersCounter.propTypes = {
  socket: PropTypes.object,
};

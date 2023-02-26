import React, { useEffect, useMemo, useState } from 'react';

import { Box, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';

const PlayersCounter = ({ socket }) => {
  const { t } = useTranslation();
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
    <Box id="players-counter">
      <Typography
        variant='h3'
        color={color}
        sx={{ borderColor: 'primary.main' }}
      >
        {t('Waiting for opponent')}
      </Typography>
      <Typography variant='h4' color={color}>
        {t('Active players:')} {players}
      </Typography>
    </Box>
  );
};

export default PlayersCounter;

PlayersCounter.propTypes = {
  socket: PropTypes.object,
};

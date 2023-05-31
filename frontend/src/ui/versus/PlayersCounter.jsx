import React, { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';
import useTheme from 'helpers/useTheme';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';

const PlayersCounter = ({ socket }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
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
    <Box id='players-counter'>
      <Typography
        variant='h3'
        color={theme}
        sx={{ borderColor: 'primary.main' }}
      >
        {t('awaiting-opponent-message')}
      </Typography>
      <Typography variant='h4' color={theme}>
        {t('player-count-label')} {players}
      </Typography>
    </Box>
  );
};

export default PlayersCounter;

PlayersCounter.propTypes = {
  socket: PropTypes.object,
};

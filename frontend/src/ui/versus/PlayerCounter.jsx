import React, { useEffect, useState } from 'react';

import { PropTypes } from 'prop-types';

const PlayerCounter = ({ socket }) => {
  const [players, setPlayers] = useState(0);
  useEffect(() => {
    socket.on('players', (mess) => {
      setPlayers(mess);
    });

    return () => {
      socket.off('players');
    };
  }, []);

  return <div>Active players: {players}</div>;
};

export default PlayerCounter;

PlayerCounter.propTypes = {
  socket: PropTypes.object,
};

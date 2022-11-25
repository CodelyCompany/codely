import React, { useEffect, useState } from 'react';

import { PropTypes } from 'prop-types';
import { MutatingDots } from 'react-loader-spinner';

import VersusFound from './VersusFound';

const SearchingGame = ({ socket, setFound }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on('game', () => {
      setFound(true);
      setOpen(true);
    });

    return () => {
      socket.off('game');
    };
  }, []);

  return (
    <>
      <VersusFound open={open} setOpen={setOpen} />
      <MutatingDots
        height="100"
        width="100"
        color="rgb(25, 118, 210)"
        secondaryColor="rgb(25, 118, 210)"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{ justifyContent: 'center' }}
        wrapperClass=""
        visible={true}
      />
    </>
  );
};

export default SearchingGame;

SearchingGame.propTypes = {
  setFound: PropTypes.func.isRequired,
  socket: PropTypes.object,
};

import React, { useEffect, useState } from 'react';

import { PropTypes } from 'prop-types';
import { MutatingDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

import VersusFound from './VersusFound';

const SearchingGame = ({ socket, setFound, found, setSocket }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on('game', (id) => {
      setFound(id);
      setOpen(true);
    });
    socket.on('session-close', () => {
      if (socket) {
        setOpen(false);
        setFound(null);
      }
    });
    socket.on('game-accepted', (mess) => {
      const message = JSON.parse(mess);
      console.log(message);
      navigate(`/versus/room/${message.roomId}/exercise/${message.exId}`);
    });
    return () => {
      socket.off('game');
      socket.off('session-close');
    };
  }, []);

  return (
    <>
      <VersusFound
        open={open}
        setOpen={setOpen}
        socket={socket}
        id={found}
        setSocket={setSocket}
      />
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
  found: PropTypes.string,
  setSocket: PropTypes.func.isRequired,
};

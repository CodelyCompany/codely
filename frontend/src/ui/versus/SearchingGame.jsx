import React, { useEffect, useState } from 'react';

import { PropTypes } from 'prop-types';
import { MutatingDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

import VersusFound from './VersusFound';

const SearchingGame = ({ socket, setFound, found, DisconnectSocket }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [language, setLanguage] = useState(null);

  useEffect(() => {
    socket.on('game', (mess) => {
      const parsedMess = JSON.parse(mess);
      setFound(parsedMess.game);
      setLanguage(parsedMess.language);
      setOpen(true);
    });
    socket.on('session-close', () => {
      if (socket) {
        setAccepted(false);
        setOpen(false);
        setFound(null);
      }
    });
    socket.on('game-accepted', (mess) => {
      const message = JSON.parse(mess);
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
        language={language}
        open={open}
        setOpen={setOpen}
        socket={socket}
        id={found}
        DisconnectSocket={DisconnectSocket}
        accepted={accepted}
        setAccepted={setAccepted}
      />
      <MutatingDots
        height='100'
        width='100'
        color='rgb(25, 118, 210)'
        secondaryColor='rgb(25, 118, 210)'
        radius='12.5'
        ariaLabel='mutating-dots-loading'
        wrapperStyle={{ justifyContent: 'center' }}
        wrapperClass=''
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
  DisconnectSocket: PropTypes.func.isRequired,
};

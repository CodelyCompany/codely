import React, { useEffect, useState } from 'react';

import { Box, Button } from '@mui/material';
import * as _ from 'lodash';
import { io } from 'socket.io-client';

import PlayerCounter from './PlayerCounter';

const Versus = () => {
  const [socket, setSocket] = useState(null);
  const connect = () => {
    const socket = io('http://localhost:5002/');
    setSocket(socket);
  };

  useEffect(() => {
    if (socket) {
      const newSocket = io(`http://${window.location.hostname}:8000`);
      setSocket(newSocket);
      return () => newSocket.close();
    }
  }, [setSocket]);

  return (
    <Box>
      {socket && <PlayerCounter socket={socket} />}
      <Button onClick={() => connect()}>Find opponent</Button>
    </Box>
  );
};

export default Versus;

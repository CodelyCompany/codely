import React, { useRef } from 'react';

import { Box, Button } from '@mui/material';
import { io } from 'socket.io-client';

const Versus = () => {
  const connection = useRef({});

  const connect = () => {
    connection.current = io('http://localhost:5002/');
  };

  return (
    <Box>
      <Button onClick={() => connect()}>Connect</Button>
    </Box>
  );
};

export default Versus;

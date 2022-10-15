import React from 'react';
import { Button } from '@mui/material';
import { VscDebugStart } from 'react-icons/vsc';

const RunButton = () => {
  const style = {
    height: '40px',
    width: 180,
    marginTop: '8px',
    marginLeft: '8px',
  };

  return (
    <Button variant='outlined' sx={style}>
      {' '}
      <VscDebugStart />
      Run
    </Button>
  );
};

export default RunButton;

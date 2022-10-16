import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { VscDebugStart } from 'react-icons/vsc';

const RunButton = ({ code, setOutput }) => {
  const style = {
    height: '40px',
    width: 180,
    marginTop: '8px',
    marginLeft: '8px',
  };

  const runCode = (code) => {
    axios
      .post('http://localhost:6000/', { toExecute: code })
      .then((response) => {
        setOutput(response.data.toString());
      })
      .catch((err) => console.log(err));
  };

  return (
    <Button variant='outlined' sx={style} onClick={() => runCode(code)}>
      <VscDebugStart />
      Run
    </Button>
  );
};

export default RunButton;

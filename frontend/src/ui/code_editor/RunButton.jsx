import React from 'react';

import { Button } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import { VscDebugStart } from 'react-icons/vsc';

const RunButton = ({ code, setOutput, language }) => {
  const style = {
    height: '40px',
    width: 180,
    marginTop: '8px',
    marginLeft: '8px',
  };

  const runCode = (code) => {
    axios
      .post(
        `${
          process.env.REACT_APP_CONTAINERS_ADDRESS || 'http://localhost:5001'
        }/${language.toLowerCase() === 'c++' ? 'cpp' : language.toLowerCase()}`,
        {
          toExecute: code,
        }
      )
      .then((response) => {
        setOutput(response.data.output.toString());
      })
      .catch((err) => console.log(err));
  };

  return (
    <Button variant="outlined" sx={style} onClick={() => runCode(code)}>
      <VscDebugStart />
      Run
    </Button>
  );
};

export default RunButton;

RunButton.propTypes = {
  code: PropTypes.string.isRequired,
  setOutput: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};

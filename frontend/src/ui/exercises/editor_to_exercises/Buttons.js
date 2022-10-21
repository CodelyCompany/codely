import React from 'react';

import { Button } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';

const Buttons = ({ setOutput, code, language }) => {
  const runCode = (code) => {
    axios
      .post(
        `${process.env.REACT_APP_CONTAINERS_ADDRESS}/${
          language.toLowerCase() === 'c++' ? 'cpp' : language.toLowerCase()
        }`,
        {
          toExecute: code,
        }
      )
      .then((response) => {
        setOutput(response.data.output.toString());
      });
  };

  const submitExercise = () => {
    console.log('Submit exercise');
  };

  return (
    <div>
      <Button
        onClick={() => runCode(code)}
        sx={{ margin: '5px', width: '100px' }}
        variant="contained"
      >
        Run
      </Button>
      <Button
        onClick={() => submitExercise()}
        sx={{ width: '100px' }}
        variant="contained"
      >
        Submit
      </Button>
    </div>
  );
};

export default Buttons;

Buttons.propTypes = {
  setOutput: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

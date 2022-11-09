import React, { useState } from 'react';

import Editor from '@monaco-editor/react';
import { Box, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { PropTypes } from 'prop-types';

const ExampleSolution = ({ step, setStep }) => {
  const [code, setCode] = useState('');

  const submit = () => {
    console.log('submit');
  };

  const prev = () => {
    setStep((prev) => ({ ...prev, currentStep: 4 }));
  };

  const handleCodeChange = (e) => {
    setCode(e);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: 'calc(900px - 10px)',
          height: '200px',
          border: '3px solid rgb(25, 118, 210)',
          borderRadius: '5px',
          margin: '10px',
          padding: '5px',
        }}
      >
        {' '}
        <Editor
          loading={<CircularProgress />}
          height='100%'
          language={
            step.dataFromStep1
              ? step.dataFromStep1.programmingLanguage.toLowerCase()
              : 'javascript'
          }
          value={code}
          onChange={handleCodeChange}
          width='100%'
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '900px',
        }}
      >
        <Button
          sx={{ marginBottom: '10px' }}
          variant='contained'
          onClick={prev}
        >
          Previous
        </Button>
        <Button variant='contained' onClick={submit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default ExampleSolution;

ExampleSolution.propTypes = {
  step: PropTypes.object.isRequired,
  setStep: PropTypes.func.isRequired,
};

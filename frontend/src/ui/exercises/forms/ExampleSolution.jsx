import React, { useState } from 'react';

import Editor from '@monaco-editor/react';
import { Box, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { PropTypes } from 'prop-types';

const ExampleSolution = ({ step, setStep }) => {
  const [code, setCode] = useState('');

  const prev = () => {
    setStep((prev) => ({ ...prev, currentStep: 4, dataFromStep4: code }));
  };

  const handleCodeChange = (e) => {
    setCode(e);
  };

  const verifySolution = () => {
    console.log({
      exampleSolution: code,
      tests: step.dataFromStep3,
      ...step.dataFromStep1,
    });
    axios
      .post(`https://${process.env.REACT_APP_DOMAIN}/oauth/token`, {
        client_id: process.env.REACT_APP_CONTAINERS_CLIENT_ID,
        client_secret: process.env.REACT_APP_CONTAINERS_CLIENT_SECRET,
        audience: `${
          process.env.REACT_APP_CONTAINERS_ADDRESS || 'http://localhost:5001'
        }`,
        grant_type: 'client_credentials',
      })
      .then((token) => {
        axios
          .post(
            'http://localhost:5000/exercises/checkBeforeAddExercise',
            {
              exampleSolution: code,
              tests: step.dataFromStep3,
              ...step.dataFromStep1,
            },
            {
              headers: {
                Authorization: `Bearer ${token.data.access_token}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
          });
      });
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
        <Button variant='contained' onClick={verifySolution}>
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

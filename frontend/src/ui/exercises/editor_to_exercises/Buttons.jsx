import React from 'react';

import { Box, Button } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Buttons = ({ setOutput, code, language }) => {
  const navigate = useNavigate();

  const runCode = (code) => {
    (async () => {
      await axios
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
              `${
                process.env.REACT_APP_CONTAINERS_ADDRESS ||
                'http://localhost:5001'
              }/${
                language.toLowerCase() === 'c++'
                  ? 'cpp'
                  : language.toLowerCase()
              }`,
              {
                toExecute: code,
              },
              {
                headers: {
                  Authorization: `Bearer ${token.data.access_token}`,
                },
              }
            )
            .then((response) => {
              setOutput(response.data.output.toString());
            })
            .catch((err) => console.log(err));
        })
        .catch((e) => console.log(e));
    })();
  };

  const submitExercise = () => {
    console.log('Submit exercise');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        {' '}
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
      </Box>
      <Box>
        <Button
          onClick={() => navigate(-1)}
          sx={{ width: '100px', margin: '5px' }}
          variant="contained"
        >
          Undo
        </Button>
      </Box>
    </Box>
  );
};

export default Buttons;

Buttons.propTypes = {
  setOutput: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

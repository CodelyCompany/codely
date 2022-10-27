import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
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

  // const { getAccessTokenSilently } = useAuth0();

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

  return (
    <Button variant="outlined" sx={style} onClick={() => runCode(code)}>
      <VscDebugStart style={{ position: 'relative', bottom: '3px' }} />
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

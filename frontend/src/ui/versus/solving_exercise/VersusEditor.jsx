import React, { useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import Editor from '@monaco-editor/react';
import { Box, CircularProgress } from '@mui/material';
import { getUserByUsername } from 'ducks/user/selectors';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';

const VersusEditor = ({ code, setCode, language, functionSignature }) => {
  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname));

  const handleCodeChange = (value) => {
    setCode(value);
  };

  useEffect(() => {
    setCode(functionSignature);
  }, []);

  return (
    <Box
      id='versus-editor-container'
      sx={{
        borderColor: 'primary.main',
      }}
    >
      <Editor
        loading={<CircularProgress />}
        theme={foundUser.theme === 1 ? 'vs-dark' : 'vs'}
        height='300px'
        language={
          language.toLowerCase() === 'c++' ? 'cpp' : language.toLowerCase()
        }
        value={code}
        onChange={handleCodeChange}
        width='100%'
      />
    </Box>
  );
};

export default VersusEditor;

VersusEditor.propTypes = {
  code: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  functionSignature: PropTypes.string.isRequired,
};

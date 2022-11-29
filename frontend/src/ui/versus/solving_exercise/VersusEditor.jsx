import React, { useEffect } from 'react';

import Editor from '@monaco-editor/react';
import { Box, CircularProgress } from '@mui/material';
import { PropTypes } from 'prop-types';

const VersusEditor = ({ code, setCode, language, functionSignature }) => {
  const handleCodeChange = (value) => {
    setCode(value);
  };

  useEffect(() => {
    setCode(functionSignature);
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        border: '3px solid rgb(25, 118, 210)',
        borderRadius: '5px',
      }}
    >
      <Editor
        loading={<CircularProgress />}
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

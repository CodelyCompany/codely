import { useEffect } from 'react';
import React from 'react';

import Editor from '@monaco-editor/react';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';

import texts from './languages-properties/startText';

const CodeField = ({ code, setCode, language }) => {
  const handleCodeChange = (value) => {
    setCode(value);
  };

  useEffect(() => {
    setCode(texts[language.toLowerCase()]);
  }, [language]);

  return (
    <Box sx={{ display: 'flex', width: '100%', marginLeft: '7px' }}>
      <div
        style={{
          height: '370px',
          width: '100%',
          overflow: 'auto',
          border: '3px solid rgb(25, 118, 210)',
          borderRadius: '5px',
          textAlign: 'start',
          padding: '2px',
        }}
      >
        <Editor
          loading={<CircularProgress />}
          height="100%"
          language={
            language.toLowerCase() === 'c++' ? 'cpp' : language.toLowerCase()
          }
          value={code}
          onChange={handleCodeChange}
          width="100%"
        />
      </div>
    </Box>
  );
};

export default CodeField;

CodeField.propTypes = {
  code: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};

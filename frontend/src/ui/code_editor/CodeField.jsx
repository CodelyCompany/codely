import { useEffect } from 'react';
import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import Editor from '@monaco-editor/react';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { getUserByUsername } from 'ducks/user/selectors';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import texts from 'ui/code_editor/languages-properties/startText';

const CodeField = ({ code, setCode, language }) => {
  const handleCodeChange = (value) => {
    setCode(value);
  };

  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname)) ?? {
    theme: 0,
  };

  useEffect(() => {
    setCode(texts[language.toLowerCase()]);
  }, [language]);

  return (
    <Box id="code-field-container">
      <Box
          id="code-field-wrapper"
          borderColor={foundUser?.theme === 2 ? 'secondary.main' : 'primary.main'}
      >
        <Editor
          loading={<CircularProgress />}
          theme={foundUser && foundUser.theme === 1 ? 'vs-dark' : 'vs'}
          height='100%'
          language={
            language.toLowerCase() === 'c++' ? 'cpp' : language.toLowerCase()
          }
          value={code}
          onChange={handleCodeChange}
          width='100%'
        />
      </Box>
    </Box>
  );
};

export default CodeField;

CodeField.propTypes = {
  code: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};

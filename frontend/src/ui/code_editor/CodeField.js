import { Box } from '@mui/material';
import * as _ from 'lodash';
import Editor from '@monaco-editor/react';
import texts from './languages-properties/startText';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

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

import React, { useState } from 'react';

import Editor from '@monaco-editor/react';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import * as _ from 'lodash';
import { PropTypes } from 'prop-types';

import texts from '../../code_editor/languages-properties/startText';
import OutputField from '../../code_editor/OutputField';

import Buttons from './Buttons';
import Tests from './Tests';

const EditorField = ({ language }) => {
  const [code, setCode] = useState(texts[language.toLowerCase()]);
  const [output, setOutput] = useState('');
  const [tests, setTests] = useState({});

  const handleCodeChange = (value) => {
    setCode(value);
  };

  return (
    <Box>
      <Box>
        <Buttons
          setOutput={setOutput}
          code={code}
          language={language}
          tests={tests}
          setTests={setTests}
        />
      </Box>
      <Box
        sx={{
          height: '300px',
          border: '3px solid rgb(25, 118, 210)',
          borderRadius: '5px',
        }}
      >
        <Editor
          loading={<CircularProgress />}
          height='100%'
          language={language.toLowerCase()}
          value={code}
          onChange={handleCodeChange}
          width='100%'
        />
      </Box>
      {output && <OutputField output={output} />}
      {!_.isEmpty(tests) && <Tests tests={tests} />}
    </Box>
  );
};

export default EditorField;

EditorField.propTypes = {
  language: PropTypes.string.isRequired,
};

import React, { useState } from 'react';

import Editor from '@monaco-editor/react';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import * as _ from 'lodash';
import { PropTypes } from 'prop-types';

import OutputField from '../../code_editor/OutputField';

import Buttons from './Buttons';
import CustomArgs from './CustomArgs';
import Tests from './Tests';

const EditorField = ({
  language,
  functionSignature,
  args,
  argumentValues,
  setArgumentValues,
  functionName,
}) => {
  const [code, setCode] = useState(functionSignature);
  const [output, setOutput] = useState('');
  const [tests, setTests] = useState({});

  const handleCodeChange = (value) => {
    setCode(value);
  };

  return (
    <Box>
      <Box>
        <CustomArgs
          args={args}
          setArgumentValues={setArgumentValues}
          argumentValues={argumentValues}
        />
        <Buttons
          argumentValues={argumentValues}
          setOutput={setOutput}
          code={code}
          language={language}
          tests={tests}
          setTests={setTests}
          functionName={functionName}
        />
      </Box>

      <Box
        sx={{
          height: '300px',
          borderColor: 'primary.main',
          border: '3px solid',
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
  functionSignature: PropTypes.string,
  args: PropTypes.array,
  argumentValues: PropTypes.array,
  setArgumentValues: PropTypes.func.isRequired,
  functionName: PropTypes.string.isRequired,
};

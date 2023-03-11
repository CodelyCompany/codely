import React, { useMemo, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import Editor from '@monaco-editor/react';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { getUserByUsername } from 'ducks/user/selectors';
import * as _ from 'lodash';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import OutputField from 'ui/code_editor/OutputField';
import Buttons from 'ui/exercises/editor_to_exercises/Buttons';
import CustomArgs from 'ui/exercises/editor_to_exercises/CustomArgs';
import Tests from 'ui/exercises/editor_to_exercises/Tests';

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
  const [loadingFinished, setLoadingFinished] = useState(true);
  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname));
  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary.main'
        : 'primary.main',
    [localStorage.getItem('theme')]
  );
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
          setLoadingFinished={setLoadingFinished}
          loadingFinished={loadingFinished}
          argumentValues={argumentValues}
          setOutput={setOutput}
          code={code}
          language={language}
          tests={tests}
          setTests={setTests}
          functionName={functionName}
        />
      </Box>

      <Box id='editor-field-wrapper' sx={{ borderColor: color }}>
        <Editor
          theme={foundUser.theme === 1 ? 'vs-dark' : 'vs'}
          loading={<CircularProgress />}
          height='100%'
          language={language.toLowerCase()}
          value={code}
          onChange={handleCodeChange}
          width='100%'
        />
      </Box>
      {output && (
        <OutputField output={output} loadingFinished={loadingFinished} />
      )}
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

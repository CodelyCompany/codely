import React, { useEffect, useMemo, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import Editor from '@monaco-editor/react';
import { Box, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import { connect, useSelector } from 'react-redux';

import {
  AddExercise,
  UpdateExercise,
} from '../../../ducks/exercises/operations';
import {
  ChangeAddStatus,
  ChangeUpdateStatus,
} from '../../../ducks/popups/actions';
import { getToken } from '../../../ducks/token/selectors';
import { getUserByUsername } from '../../../ducks/user/selectors';
import SubmitAlert from '../../popups/SubmitAlert';
import GetToken from '../../user/GetToken';

import { getSignature } from './utils/functionSignatures';

const ExampleSolution = ({
  step,
  setStep,
  AddExercise,
  ChangeAddStatus,
  dataToEdit,
  UpdateExercise,
  ChangeUpdateStatus,
  token,
}) => {
  const [code, setCode] = useState('');
  const [tests, setTests] = useState(null);
  const { user } = useAuth0();
  const [triggered, setTriggered] = useState(false);
  const signature = useMemo(
    () =>
      getSignature(
        step.dataFromStep1.programmingLanguage
          ? step.dataFromStep1.programmingLanguage.toLowerCase()
          : '',
        step.dataFromStep2.functionName ? step.dataFromStep2.functionName : '',
        step.dataFromStep2.argumentsName
          ? step.dataFromStep2.argumentsName
          : '',
        step.dataFromStep2.types ? step.dataFromStep2.types : []
      ),
    [step.dataFromStep1, step.dataFromStep2]
  );

  const foundUser = useSelector(getUserByUsername(user.nickname));

  useEffect(() => {
    if (tests) setTriggered(true);
  }, [tests]);

  useEffect(() => {
    step.dataFromStep1.programmingLanguage &&
      step.dataFromStep2.functionName &&
      step.dataFromStep2.argumentsName &&
      setCode(
        step.code
          ? step.code
          : dataToEdit
          ? dataToEdit.exampleSolution
          : signature
      );
  }, []);

  const prev = () => {
    setStep((prev) => ({ ...prev, currentStep: 4, code }));
  };

  const handleCodeChange = (e) => {
    setCode(e);
  };

  const submit = () => {
    if (!dataToEdit) {
      AddExercise(
        {
          author: foundUser._id,
          ...step.dataFromStep1,
          ...step.dataFromStep2,
          tests: step.dataFromStep3,
          hints: step.dataFromStep4.map((el) => el[1]),
          exampleSolution: code,
          functionSignature: signature,
        },
        token
      );
      ChangeAddStatus();
      return;
    }
    UpdateExercise(
      {
        id: dataToEdit._id,
        author: foundUser._id,
        ...step.dataFromStep1,
        ...step.dataFromStep2,
        tests: step.dataFromStep3,
        hints: step.dataFromStep4.map((el) => el[1]),
        exampleSolution: code,
        functionSignature: signature,
      },
      token
    );
    ChangeUpdateStatus();
  };

  const verifySolution = () => {
    axios
      .post(
        'http://localhost:5000/exercises/checkBeforeAddExercise',
        {
          exampleSolution: code,
          tests: step.dataFromStep3,
          ...step.dataFromStep2,
          ...step.dataFromStep1,
          programmingLanguage:
            step.dataFromStep1.programmingLanguage === 'C++'
              ? 'cpp'
              : step.dataFromStep1.programmingLanguage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setTests(response.data);
      });
  };

  return (
    <>
      <GetToken />
      <SubmitAlert
        triggered={triggered}
        setTriggered={setTriggered}
        passed={tests && tests.correct === tests.tests}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
<<<<<<< HEAD
=======
          width: 'calc(900px - 10px)',
          height: '200px',
          border: '3px solid rgb(25, 118, 210)',
          borderRadius: '5px',
          margin: '10px',
          padding: '5px',
        }}
      >
        {' '}
        <Editor
          loading={<CircularProgress />}
          height="100%"
          language={
            step.dataFromStep1
              ? step.dataFromStep1.programmingLanguage === 'C++'
                ? 'cpp'
                : step.dataFromStep1.programmingLanguage.toLowerCase()
              : 'javascript'
          }
          value={code}
          onChange={handleCodeChange}
          width="100%"
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
>>>>>>> e8bdc726c3897880080e25b5b5b3e99a7721a1c5
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
<<<<<<< HEAD
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: 'calc(900px - 10px)',
            height: '200px',
            border: '3px solid rgb(25, 118, 210)',
            borderRadius: '5px',
            margin: '10px',
            padding: '5px',
          }}
        >
          {' '}
          <Editor
            loading={<CircularProgress />}
            height='100%'
            language={
              step.dataFromStep1
                ? step.dataFromStep1.programmingLanguage === 'C++'
                  ? 'cpp'
                  : step.dataFromStep1.programmingLanguage.toLowerCase()
                : 'javascript'
            }
            value={code}
            onChange={handleCodeChange}
            width='100%'
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '900px',
          }}
        >
          <Button
            sx={{ marginBottom: '10px' }}
            variant='contained'
            onClick={prev}
          >
            Previous
          </Button>
          <Button
            variant='contained'
            onClick={() =>
              tests
                ? tests.correct !== tests.tests
                  ? verifySolution()
                  : submit()
                : verifySolution()
            }
          >
            {tests
=======
        <Button
          sx={{ marginBottom: '10px' }}
          variant="contained"
          onClick={prev}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            tests
>>>>>>> e8bdc726c3897880080e25b5b5b3e99a7721a1c5
              ? tests.correct !== tests.tests
                ? `Check exercise again (Last run: ${tests.correct} / ${tests.tests})`
                : `Click again to pass your exercise for admin verification.`
              : 'Check exercise'}
          </Button>
        </Box>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  token: getToken(state),
});

const mapDispatchToProps = {
  AddExercise,
  ChangeAddStatus,
  UpdateExercise,
  ChangeUpdateStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExampleSolution);

ExampleSolution.propTypes = {
  step: PropTypes.object.isRequired,
  setStep: PropTypes.func.isRequired,
  AddExercise: PropTypes.func,
  ChangeAddStatus: PropTypes.func,
  dataToEdit: PropTypes.object,
  UpdateExercise: PropTypes.func,
  ChangeUpdateStatus: PropTypes.func,
  token: PropTypes.string,
};

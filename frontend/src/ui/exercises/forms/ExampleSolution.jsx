import React, { useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import Editor from '@monaco-editor/react';
import { Box, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { AddExercise, UpdateExercise } from 'ducks/exercises/operations';
import { addPopup } from 'ducks/popups/actions';
import { getUserByUsername } from 'ducks/user/selectors';
import useExerciseData from 'helpers/useExerciseData';
import useTheme from 'helpers/useTheme';
import useToken from 'helpers/useToken';
import _ from 'lodash';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ThreeDots } from 'react-loader-spinner';
import { connect, useDispatch, useSelector } from 'react-redux';
import TestsList from 'ui/exercises/forms/TestsList';
import { getSignature } from 'ui/exercises/forms/utils/functionSignatures';

// Fifth step of creating exercise
const ExampleSolution = ({
  setStep,
  UpdateExercise,
}) => {
  const { t } = useTranslation();
  const { token } = useToken();
  const [code, setCode] = useState('');
  const [tests, setTests] = useState(null);
  const { user } = useAuth0();
  const [finishedLoading, setFinishedLoading] = useState(true);
  const dispatch = useDispatch();
  const { color } = useTheme();
  const { id, exercise } = useExerciseData();

  useEffect(() => {
    if (exercise.exampleSolution) {
      setCode(exercise.exampleSolution);
    }
  }, [exercise]);

  useEffect(() => {
    if (!_.isEmpty(exercise) && !exercise.exampleSolution) {
      const signature = getSignature(
        exercise.programmingLanguage.toLowerCase(),
        exercise.functionName,
        exercise.argumentsName
      );
      setCode(signature);
    }
  }, [exercise]);

  const foundUser = useSelector(getUserByUsername(user.nickname)) ?? {
    theme: 0,
  };

  useEffect(() => {
    if (tests && tests.correct === tests.tests)
      dispatch(
        addPopup('Congratulation! Your code passed all tests', 'success')
      );
    if (tests && tests.correct !== tests.tests)
      dispatch(addPopup("Unfortunately, your code didn't pass tests", 'error'));
  }, [tests]);

  const prev = () => {
    setStep(4);
  };

  const handleCodeChange = (e) => {
    setCode(e);
  };

  const submit = () => {
    UpdateExercise({ id, exampleSolution: code }, token);
  };

  const verifySolution = () => {
    setFinishedLoading(false);
    setFinishedLoading(true);
  };

  return (
    <>
      <Box id='example-solution-container'>
        <Box
          className='example-solution-wrapper'
          id={`box-border-${foundUser.theme}`}
        >
          <Editor
            theme={foundUser?.theme === 1 ? 'vs-dark' : 'vs'}
            loading={<CircularProgress />}
            height='100%'
            language={'javascript'}
            value={code}
            onChange={handleCodeChange}
            width='100%'
          />
        </Box>
        <Box id='example-solution-button-wrapper'>
          <Button
            color={color.split('.')[0]}
            variant='contained'
            onClick={prev}
            id={'back'}
            className={'cancel'}
          >
            {t('Previous')}
          </Button>
          <Button
            id={tests && tests.correct === tests.tests ? 'send' : 'submit'}
            color={color.split('.')[0]}
            variant='contained'
            disabled={!finishedLoading}
            onClick={() =>
              tests
                ? tests.correct !== tests.tests
                  ? verifySolution()
                  : submit()
                : verifySolution()
            }
          >
            {finishedLoading ? (
              tests ? (
                tests.correct !== tests.tests ? (
                  `${t('Check exercise again (Last run:')} ${tests.correct} / ${
                    tests.tests
                  })`
                ) : (
                  `${t(
                    'Click again to pass your exercise for admin verification.'
                  )}`
                )
              ) : (
                t('Check exercise')
              )
            ) : (
              <ThreeDots
                height='20'
                width='20'
                radius='9'
                color='gray'
                ariaLabel='three-dots-loading'
                wrapperStyle={{
                  textAlign: 'center',
                }}
                wrapperClassName=''
                visible={true}
              />
            )}
          </Button>
        </Box>
      </Box>
      {/*<TestsList step={step} />*/}
    </>
  );
};

const mapDispatchToProps = {
  AddExercise,
  UpdateExercise,
};

export default connect(null, mapDispatchToProps)(ExampleSolution);

ExampleSolution.propTypes = {
  setStep: PropTypes.func.isRequired,
  UpdateExercise: PropTypes.func,
};

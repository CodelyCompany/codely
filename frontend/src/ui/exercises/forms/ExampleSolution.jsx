import React, { useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import Editor from '@monaco-editor/react';
import { Box, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { AddExercise, UpdateExercise, VerifyExercise } from 'ducks/exercises/operations';
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
import { useNavigate } from 'react-router-dom';
import TestsList from 'ui/exercises/forms/TestsList';
import { getSignature } from 'ui/exercises/forms/utils/functionSignatures';

// Fifth step of creating exercise
const ExampleSolution = ({
  setStep,
  UpdateExercise,
  VerifyExercise,
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
  const elementsColor = color.split('.')[0];
  const navigate = useNavigate();
  const foundUser = useSelector(getUserByUsername(user.nickname)) ?? {
    theme: 0,
  };

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
        exercise.argumentsName,
        exercise.types
      );
      setCode(signature);
    }
  }, [exercise]);

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
    UpdateExercise({ id, exampleSolution: code, step: 6 }, token, navigate('/exercises'), true);
  };

  const verifySolution = () => {
    setFinishedLoading(false);
    const { tests, programmingLanguage, functionName } = exercise;
    VerifyExercise({
      exampleSolution: code,
      tests,
      programmingLanguage,
      functionName,
    }, setTests, token, setFinishedLoading);
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
            language={exercise.programmingLanguage?.toLowerCase() || 'javascript'}
            value={code}
            onChange={handleCodeChange}
            width='100%'
          />
        </Box>
        <Box id='example-solution-button-wrapper'>
          <Button
            color={elementsColor}
            variant='contained'
            onClick={prev}
            id={'back'}
            className={'cancel'}
          >
            {t('Previous')}
          </Button>
          <Button
            color={elementsColor}
            id={tests && tests.correct === tests.tests ? 'send' : 'submit'}
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
      <TestsList />
    </>
  );
};

const mapDispatchToProps = {
  AddExercise,
  VerifyExercise,
  UpdateExercise,
};

export default connect(null, mapDispatchToProps)(ExampleSolution);

ExampleSolution.propTypes = {
  setStep: PropTypes.func.isRequired,
  UpdateExercise: PropTypes.func,
  VerifyExercise: PropTypes.func.isRequired,
};

import React, { useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, MenuItem, TextField } from '@mui/material';
import { UpdateExercise } from 'ducks/exercises/operations';
import { getUserByUsername } from 'ducks/user/selectors';
import useExerciseData from 'helpers/useExerciseData';
import useTheme from 'helpers/useTheme';
import useToken from 'helpers/useToken';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';
import { testFormValidation }
  from 'ui/exercises/forms/validationSchemes/testFormValidation';

// Third step of creating exercise
const TestsForm = ({ setStep, UpdateExercise }) => {
  const { t } = useTranslation();
  const { color } = useTheme();
  const [testsQuantity, setTestsQuantity] = useState('');
  const [tests, setTests] = useState([]);
  const [error, setError] = useState({});
  const { token } = useToken();
  const { user } = useAuth0();
  const { id, exercise } = useExerciseData();
  const validation = testFormValidation(t);
  const elementsColor = color.split('.')[0];
  const foundUser = useSelector(getUserByUsername(user.nickname)) ?? {
    theme: 0,
  };

  useEffect(() => {
    if (exercise.tests) {
      setTestsQuantity(exercise.tests.length);
      setTests(exercise.tests);
    }
  }, [exercise]);

  const submitValues = () => {
    validation.testsValidationSchema
      .validate({ tests })
      .then((valid) => {
        if (valid) {
          UpdateExercise({ id, tests, step: 4 }, token);
          setError({});
          setStep(4);
        }
      })
      .catch((err) => setError({ error: err.errors }));
  };

  const goToPreviousStage = () => {
    setStep(2);
  };

  const handleOutput = (testIndex, e) => {
    setTests((prev) =>
      prev.map((el, index) => {
        if (testIndex === index) {
          return {
            ...el,
            output: e.target.value,
          };
        }
        return el;
      })
    );
  };

  const handleTests = (testNumber, argNumber, e) => {
    setTests((prev) =>
      prev.map((test, index) => {
        if (testNumber === index) {
          return {
            ...test,
            input: test.input.map((input, argIndex) => {
              if (argNumber === argIndex) {
                return e.target.value;
              }
              return input;
            }),
          };
        }
        return test;
      })
    );
  };

  useEffect(() => {
    setTests((prev) =>
      [...Array(testsQuantity).keys()].map((el, index) => {
        if (!prev[index]) {
          return {
            input: [...Array(exercise.argumentsName?.length).keys()].map(
              () => ''
            ),
            output: '',
          };
        }
        if (prev[index].input.length !== exercise.argumentsName?.length) {
          return {
            ...prev[index],
            input: [...Array(exercise.argumentsName?.length).keys()].map(
              (missingInput, missingInputIndex) => {
                if (prev[index].input[missingInputIndex])
                  return prev[index].input[missingInputIndex];
                return '';
              }
            ),
          };
        }
        return prev[index];
      })
    );
  }, [testsQuantity, exercise]);

  return (
    <Box id='tests-form-container'>
      <Box id='tests-quantity-wrapper'>
        <TextField
          color={elementsColor}
          focused
          sx={{ color }}
          id={`testsQuantity-${foundUser.theme}`}
          name='testsQuantity'
          label={t('Choose tests quantity')}
          value={testsQuantity}
          onChange={(e) => setTestsQuantity(parseInt(e.target.value))}
          select
        >
          {[...Array(20).keys()].map((option) => (
            <MenuItem key={option + 1} value={option + 1}>
              {option + 1}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <form>
        {testsQuantity !== '' &&
          [...Array(testsQuantity).keys()].map((number, index) => {
            const outputLabel = !index ? { label: t(`output`) } : {};
            return (
              <Box key={number}>
                <Box>
                  {[...Array(exercise.argumentsName.length).keys()].map(
                    (argNumber) => {
                      const label = !index ? { label: exercise.argumentsName[argNumber] } : {};
                      return (
                        <TextField
                          color={elementsColor}
                          focused
                          sx={{ input: { color } }}
                          {...label}
                          key={argNumber}
                          id={`input-${index}-${argNumber}`}
                          value={tests[index]?.input[argNumber] || ''}
                          onChange={(e) => handleTests(index, argNumber, e)}
                          error={
                            error.error &&
                            !validation.inputValidation.isValidSync(
                              tests[index]?.input[argNumber] || ''
                            )
                          }
                          helperText={
                            error &&
                            !validation.inputValidation.isValidSync(
                              tests[index]?.input[argNumber] || ''
                            ) &&
                            error.error
                          }
                        />
                      );
                    })}
                </Box>
                <Box>
                  <TextField
                    color={elementsColor}
                    focused
                    id={`output-${index}`}
                    sx={{ input: { color } }}
                    {...outputLabel}
                    value={tests[index]?.output || ''}
                    onChange={(e) => handleOutput(index, e)}
                    error={
                      error.error &&
                      !validation.outputValidation.isValidSync(
                        tests[index]?.output || ''
                      )
                    }
                    helperText={
                      error.error &&
                      !validation.outputValidation.isValidSync(
                        tests[index]?.output || ''
                      ) &&
                      error.error
                    }
                  />
                </Box>
              </Box>
            );
          })}

        <Button
          color={elementsColor}
          fullWidth
          type='button'
          onClick={() => goToPreviousStage()}
          variant='contained'
          className={'cancel-3'}
        >
          {t('Previous')}
        </Button>
        <Button
          color={elementsColor}
          fullWidth
          type='button'
          onClick={() => submitValues()}
          variant='contained'
          id={'submit-3'}
        >
          {t('Next')}
        </Button>
      </form>
    </Box>
  );
};

const mapDispatchToProps = {
  UpdateExercise,
};

export default connect(null, mapDispatchToProps)(TestsForm);

TestsForm.propTypes = {
  setStep: PropTypes.func.isRequired,
  UpdateExercise: PropTypes.func.isRequired,
};

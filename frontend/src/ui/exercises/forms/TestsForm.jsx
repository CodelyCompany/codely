import React, { useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, MenuItem, TextField } from '@mui/material';
import { getUserByUsername } from 'ducks/user/selectors';
import useTheme from 'helpers/useTheme';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

const TestsForm = ({ setStep, dataToEdit, step }) => {
  const { t } = useTranslation();
  const { color } = useTheme();
  const [testsQuantity, setTestsQuantity] = useState('');
  const [tests, setTests] = useState([]);
  const [triggered, setTriggered] = useState(false);
  const [error, setError] = useState({});
  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname)) ?? {
    theme: 0,
  };

  const inputValidation = yup
    .string(t('Enter an input'))
    .required(t('Input is required'));

  const outputValidation = yup
    .string(t('Enter an output'))
    .required(t('Output is required'));

  const testsValidationSchema = yup.object({
    tests: yup.array(t('Enter all tests')).of(
      yup.object({
        input: yup
          .array(t('Enter this field'))
          .of(
            yup
              .string(t('Enter this field'))
              .required(t('This field is required'))
          ),
        output: yup
          .string(t('Enter this field'))
          .required(t('This field is required')),
      })
    ),
  });

  const submitValues = () => {
    testsValidationSchema
      .validate({ tests })
      .then((valid) => {
        if (valid) {
          setError({});
          setStep((prev) => ({
            ...prev,
            currentStep: 4,
            dataFromStep3: tests,
          }));
        }
      })
      .catch((err) => setError({ error: err.errors }));
  };

  const goToPreviousStage = () => {
    setStep((prev) => ({
      ...prev,
      currentStep: 2,
      dataFromStep3: tests,
    }));
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
    if (!triggered && step.dataFromStep3) {
      setTestsQuantity(step.dataFromStep3.length);
      setTriggered(true);
      setTests(step.dataFromStep3);
      return;
    }
    if (!triggered && dataToEdit) {
      setTriggered(true);
      setTests(dataToEdit.tests);
      setTestsQuantity(dataToEdit.tests.length);
      return;
    }
    setTests((prev) =>
      [...Array(testsQuantity).keys()].map((el, index) => {
        if (!prev[index])
          return {
            input: [...Array(step.dataFromStep2.argumentsQuantity).keys()].map(
              () => ''
            ),
            output: '',
          };
        if (prev[index].input.length !== step.dataFromStep2.argumentsQuantity) {
          return {
            ...prev[index],
            input: [...Array(step.dataFromStep2.argumentsQuantity).keys()].map(
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
  }, [testsQuantity]);

  return (
    <Box id='tests-form-container'>
      <Box id='tests-quantity-wrapper'>
        <TextField
          color={color.split('.')[0]}
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
            const outputLabel =
              index === 0
                ? {
                    label: t(`output`),
                  }
                : {};
            return (
              <Box key={number}>
                <Box>
                  {[...Array(step.dataFromStep2.argumentsQuantity).keys()].map(
                    (argNumber) => {
                      const label =
                        index === 0
                          ? {
                              label: `${
                                step.dataFromStep2
                                  ? step.dataFromStep2?.argumentsName[argNumber]
                                  : ''
                              }`,
                            }
                          : {};
                      return (
                        <TextField
                          color={color.split('.')[0]}
                          focused
                          sx={{ input: { color } }}
                          {...label}
                          key={argNumber}
                          id={`input-${index}-${argNumber}`}
                          value={tests[index]?.input[argNumber] || ''}
                          onChange={(e) => handleTests(index, argNumber, e)}
                          error={
                            error.error &&
                            !inputValidation.isValidSync(
                              tests[index]?.input[argNumber] || ''
                            )
                          }
                          helperText={
                            error &&
                            !inputValidation.isValidSync(
                              tests[index]?.input[argNumber] || ''
                            ) &&
                            error.error
                          }
                        />
                      );
                    }
                  )}
                </Box>
                <Box>
                  <TextField
                    color={color.split('.')[0]}
                    focused
                    id={`output-${index}`}
                    sx={{ input: { color } }}
                    {...outputLabel}
                    value={tests[index]?.output || ''}
                    onChange={(e) => handleOutput(index, e)}
                    error={
                      error.error &&
                      !outputValidation.isValidSync(tests[index]?.output || '')
                    }
                    helperText={
                      error.error &&
                      !outputValidation.isValidSync(
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
          color={color.split('.')[0]}
          fullWidth
          type='button'
          onClick={() => goToPreviousStage()}
          variant='contained'
          className={'cancel-3'}
        >
          {t('Previous')}
        </Button>
        <Button
          color={color.split('.')[0]}
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

export default TestsForm;

TestsForm.propTypes = {
  setStep: PropTypes.func.isRequired,
  dataToEdit: PropTypes.object,
  step: PropTypes.object.isRequired,
};

import React, { useEffect, useState } from 'react';

import { Box, MenuItem } from '@mui/material';
import { Button, TextField } from '@mui/material';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import * as yup from 'yup';

const TestsForm = ({ setStep, dataToEdit, step }) => {
  const [testsQuantity, setTestsQuantity] = useState('');
  const [tests, setTests] = useState([]);
  const [triggered, setTriggered] = useState(false);
  const [error, setError] = useState({});

  const inputValidation = yup
    .string('Enter an input')
    .required('Input is required');

  const outputValidation = yup
    .string('Enter an output')
    .required('Output is required');

  const testsValidationSchema = yup.object({
    tests: yup.array('Enter all tests').of(
      yup.object({
        input: yup
          .array('Enter this field')
          .of(
            yup.string('Enter this field').required('This field is required')
          ),
        output: yup
          .string('Enter this field')
          .required('This field is required'),
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'start',
      }}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <TextField
          sx={{ marginBottom: '10px', width: '900px' }}
          id='testsQuantity'
          name='testsQuantity'
          label='Choose tests quantity'
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
      <form
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          width: '900px',
          margin: '10px',
        }}
      >
        {testsQuantity !== '' &&
          [...Array(testsQuantity).keys()].map((number, index) => {
            const outputLabel =
              index === 0
                ? {
                    label: `output`,
                  }
                : {};
            return (
              <Box
                key={number}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '10px',
                }}
              >
                <Box sx={{ display: 'flex', marginRight: '10px' }}>
                  {[...Array(step.dataFromStep2.argumentsQuantity).keys()].map(
                    (argNumber) => {
                      const label =
                        index === 0
                          ? {
                              label: `${step.dataFromStep2.argumentsName[argNumber]}`,
                            }
                          : {};
                      return (
                        <TextField
                          {...label}
                          key={argNumber}
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
          fullWidth
          sx={{ marginBottom: '10px' }}
          type='button'
          onClick={() => goToPreviousStage()}
          variant='contained'
        >
          Previous
        </Button>
        <Button
          fullWidth
          type='button'
          onClick={() => submitValues()}
          variant='contained'
        >
          Next
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

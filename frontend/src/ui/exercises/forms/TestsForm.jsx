import React, { useEffect, useState } from 'react';

import { Box, MenuItem } from '@mui/material';
import { Button, TextField } from '@mui/material';
import * as _ from 'lodash';
import PropTypes from 'prop-types';

const TestsForm = ({ setStep, dataToEdit, step }) => {
  const [testsQuantity, setTestsQuantity] = useState('');
  const [tests, setTests] = useState([]);
  const [triggered, setTriggered] = useState(false);

  const submitValues = () => {
    setStep((prev) => ({
      ...prev,
      currentStep: 4,
      dataFromStep3: tests,
    }));
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
          [...Array(testsQuantity).keys()].map((number, index) => (
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
                  (argNumber) => (
                    <TextField
                      key={argNumber}
                      value={tests[index]?.input[argNumber] || ''}
                      onChange={(e) => handleTests(index, argNumber, e)}
                      label={
                        index === 0 &&
                        `${step.dataFromStep2.argumentsName[argNumber]}`
                      }
                    />
                  )
                )}
              </Box>
              <Box>
                <TextField
                  label={index === 0 && 'output'}
                  value={tests[index]?.output || ''}
                  onChange={(e) => handleOutput(index, e)}
                />
              </Box>
            </Box>
          ))}

        <Button
          fullWidth
          sx={{ marginBottom: '10px' }}
          type='submit'
          onClick={() => goToPreviousStage()}
          variant='contained'
        >
          Previous
        </Button>
        <Button
          fullWidth
          type='submit'
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

import React, { useEffect, useState } from 'react';

import { Box, MenuItem } from '@mui/material';
import { Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const TestsForm = ({ setStep, dataToEdit, step }) => {
  const [testsQuantity, setTestsQuantity] = useState('');

  const [tests, setTests] = useState([]);
  const [triggered, setTriggered] = useState(false);
  const [triggeringChangeQuantity, setTriggeringChangeQuantity] =
    useState(false);

  // it will change size of the form
  // useEffect(() => {
  //   if (step.dataFromStep3) {
  //     setTestsQuantity(step.dataFromStep3.length);
  //     return;
  //   }
  //   dataToEdit && setTestsQuantity(dataToEdit.tests.length);
  // }, []);

  // useEffect(() => {
  //   if (!triggeringChangeQuantity) {
  //     step.dataFromStep3 && setTests(step.dataFromStep3);
  //     setTriggeringChangeQuantity((prev) => !prev);
  //   }
  // }, [testsQuantity]);

  //it will be triggered when form increase its size to fill it asynchronously
  // useEffect(() => {
  //   if (dataToEdit && !triggered && !step.dataFromStep3) {
  //     setTests(
  //       dataToEdit.tests.map((test, index) => [index, test.input, test.output])
  //     );
  //     setTriggered((prev) => !prev);
  //   }
  // }, [testsQuantity]);

  const submitValues = () => {
    if (canSubmit())
      setStep((prev) => ({
        ...prev,
        currentStep: 4,
        // dataFromStep3: tests,
      }));
  };

  const goToPreviousStage = () => {
    setStep((prev) => ({
      ...prev,
      currentStep: 2,
      dataFromStep3: tests,
    }));
  };

  // const canSubmit = () => {
  //   let submit = true;
  //   if (!tests || testsQuantity === '') return false;
  //   tests.forEach((el) => {
  //     if (el[1] === '' || el[2] === '') submit = false;
  //   });
  //   return submit;
  // };

  // useEffect(() => {
  //   setTests((prev) =>
  //     [...Array(testsQuantity).keys()].map((number) => {
  //       const found = prev.find((el) => el[0] === number);
  //       if (!found) return [number, [], ''];
  //       return found;
  //     })
  //   );
  // }, [testsQuantity]);

  // const getValue = (number, type) => {
  //   const found = tests.find((el) => el[0] === number);
  //   if (!found) return '';
  //   return type === 'input' ? found[1] : found[2];
  // };

  // const handleValue = (event, number, type) => {
  //   setTests((prev) =>
  //     prev.map((el) => {
  //       if (el[0] === number) {
  //         if (type === 'input') return [el[0], event.target.value, el[2]];
  //         return [el[0], el[1], event.target.value];
  //       }
  //       return el;
  //     })
  //   );
  // };

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

  // to uncomment
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
        if (!prev[index])
          return {
            input: [...Array(step.dataFromStep2.argumentsQuantity).keys()].map(
              () => ''
            ),
            output: '',
          };
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
      {console.log(tests)}
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

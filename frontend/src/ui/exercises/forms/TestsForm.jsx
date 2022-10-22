import React, { useEffect, useState } from 'react';

import { Box, MenuItem } from '@mui/material';
import { Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const TestsForm = ({ setStep }) => {
  const [testsQuantity, setTestsQuantity] = useState('');

  const [tests, setTests] = useState([]);

  const submitValues = () => {
    if (canSubmit())
      setStep((prev) => ({
        ...prev,
        currentStep: 3,
        dataFromStep2: tests,
      }));
  };

  const canSubmit = () => {
    let submit = true;
    if (!tests || testsQuantity === '') return false;
    tests.forEach((el) => {
      if (el[1] === '' || el[2] === '') submit = false;
    });
    return submit;
  };

  useEffect(() => {
    setTests((prev) =>
      [...Array(testsQuantity).keys()].map((number) => {
        const found = prev.find((el) => el[0] === number);
        if (!found) return [number, '', ''];
        return found;
      })
    );
  }, [testsQuantity]);

  const getValue = (number, type) => {
    const found = tests.find((el) => el[0] === number);
    if (!found) return '';
    return type === 'input' ? found[1] : found[2];
  };

  const handleValue = (event, number, type) => {
    setTests((prev) =>
      prev.map((el) => {
        if (el[0] === number) {
          if (type === 'input') return [el[0], event.target.value, el[2]];
          return [el[0], el[1], event.target.value];
        }
        return el;
      })
    );
  };

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
          id="testsQuantity"
          name="testsQuantity"
          label="Choose tests quantity"
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
          [...Array(testsQuantity).keys()].map((number) => (
            <div key={number} style={{ width: '100%' }}>
              <TextField
                sx={{
                  marginBottom: '10px',
                  marginRight: '10px',
                  width: 'calc(50% - 10px)',
                }}
                label={number === 0 ? 'Inputs' : ''}
                name="input"
                value={getValue(number, 'input')}
                onChange={(e) => handleValue(e, number, 'input')}
              />
              <TextField
                sx={{ marginBottom: '10px', width: 'calc(50% - 10px)' }}
                label={number === 0 ? 'Outputs' : ''}
                name="output"
                value={getValue(number, 'output')}
                onChange={(e) => handleValue(e, number, 'output')}
              />
            </div>
          ))}

        <Button
          fullWidth
          type="button"
          onClick={() => submitValues()}
          variant="contained"
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
};

import React, { useEffect, useState } from 'react';

import { Box, MenuItem } from '@mui/material';
import { Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const HintsForms = ({ setStep }) => {
  const [hintsQuantity, setHintsQuantity] = useState('');

  const [hints, setHints] = useState([]);

  const submitValues = () => {
    if (canSubmit())
      setStep((prev) => ({
        ...prev,
        currentStep: 4,
        dataFromStep3: hints,
      }));
  };

  const canSubmit = () => {
    let submit = true;
    if (hintsQuantity === '') return false;
    hints.forEach((el) => {
      if (el[1] === '') submit = false;
    });
    return submit;
  };

  useEffect(() => {
    setHints((prev) =>
      [...Array(hintsQuantity).keys()].map((number) => {
        const found = prev.find((el) => el[0] === number);
        if (!found) return [number, ''];
        return found;
      })
    );
  }, [hintsQuantity]);

  const getValue = (number) => {
    const found = hints.find((el) => el[0] === number);
    if (!found) return '';
    return found[1];
  };

  const handleValue = (event, number) => {
    setHints((prev) =>
      prev.map((el) => {
        if (el[0] === number) {
          return [el[0], event.target.value];
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
          id="hintsQuantity"
          name="hintsQuantity"
          label="Choose hints quantity"
          value={hintsQuantity}
          onChange={(e) => setHintsQuantity(parseInt(e.target.value))}
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
        {hintsQuantity !== '' &&
          [...Array(hintsQuantity).keys()].map((number) => (
            <div key={number} style={{ width: '100%' }}>
              <TextField
                sx={{
                  marginBottom: '10px',
                  marginRight: '10px',
                  width: '100%',
                }}
                label={number === 0 ? 'Hints' : ''}
                name="hint"
                value={getValue(number)}
                onChange={(e) => handleValue(e, number)}
              />
            </div>
          ))}

        <Button
          fullWidth
          type="button"
          onClick={() => submitValues()}
          variant="contained"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default HintsForms;

HintsForms.propTypes = {
  setStep: PropTypes.func.isRequired,
};

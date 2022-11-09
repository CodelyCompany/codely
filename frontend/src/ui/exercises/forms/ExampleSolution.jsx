import React from 'react';

import { Box, Button } from '@mui/material';
import { PropTypes } from 'prop-types';

const ExampleSolution = ({ step, setStep }) => {
  const submit = () => {
    console.log('submit');
  };

  const prev = () => {
    setStep((prev) => ({ ...prev, currentStep: 4 }));
  };

  return (
    <Box>
      ExampleSolution
      <Box>
        <Button onClick={prev}>Previous</Button>
        <Button onClick={submit}>Submit</Button>
      </Box>
    </Box>
  );
};

export default ExampleSolution;

ExampleSolution.propTypes = {
  step: PropTypes.object.isRequired,
  setStep: PropTypes.func.isRequired,
};

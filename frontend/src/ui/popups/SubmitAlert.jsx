import React, { useMemo } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, Collapse } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { PropTypes } from 'prop-types';

const SubmitAlert = ({ triggered, setTriggered, passed }) => {
  const handleTrigger = () => {
    setTriggered(false);
  };

  const messages = useMemo(
    () =>
      passed
        ? {
            severity: 'success',
            message: 'Congratulation! Your code passed all tests',
          }
        : {
            severity: 'error',
            message: "Unfortunately, your code didn't pass tests",
          },
    [passed]
  );

  return (
    <Box
      sx={{
        width: '50vw',
        position: 'absolute',
        bottom: '20px',
        zIndex: '5',
      }}
    >
      <Collapse in={triggered}>
        <Alert
          variant='filled'
          severity={messages.severity}
          action={
            <IconButton color='inherit' size='medium' onClick={handleTrigger}>
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {messages.message}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default SubmitAlert;

SubmitAlert.propTypes = {
  triggered: PropTypes.bool.isRequired,
  setTriggered: PropTypes.func.isRequired,
  passed: PropTypes.bool,
};

import React, { useMemo } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, Collapse } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { PropTypes } from 'prop-types';

const RunAlert = ({ triggered, setTriggered, code }) => {
  const handleTrigger = () => {
    setTriggered((prev) => !prev);
  };

  const messages = useMemo(
    () =>
      code === 200
        ? { severity: 'success', message: 'Your code compiled successfully' }
        : { severity: 'error', message: 'Your code compiled with errors' },
    [code]
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

export default RunAlert;

RunAlert.propTypes = {
  triggered: PropTypes.bool.isRequired,
  setTriggered: PropTypes.func.isRequired,
  code: PropTypes.number,
};

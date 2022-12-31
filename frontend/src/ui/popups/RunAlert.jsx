import React, { useMemo } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, Collapse } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';

const RunAlert = ({ triggered, setTriggered, code }) => {
  const { t } = useTranslation();

  const handleTrigger = () => {
    setTriggered((prev) => !prev);
  };

  const messages = useMemo(
    () =>
      code === 200
        ? { severity: 'success', message: t('Your code ran successfully') }
        : { severity: 'error', message: t('Your code ran with errors') },
    [code]
  );

  return (
    <Box
      sx={{
        width: '100vw',
        position: 'fixed',
        bottom: '20px',
        zIndex: '5',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Collapse sx={{ width: '50%' }} in={triggered}>
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

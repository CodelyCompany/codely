/* eslint-disable arrow-body-style */
import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, Collapse } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { getError } from '../../ducks/exercises/selectors';
import {
  CloseAddPopup,
  CloseDeletePopup,
  CloseUpdatePopup,
} from '../../ducks/popups/actions';
import {
  getAddStatus,
  getDeleteStatus,
  getUpdateStatus,
} from '../../ducks/popups/selectors';

const ExerciseAlert = ({
  addStatus,
  deleteStatus,
  updateStatus,
  CloseAddPopup,
  CloseDeletePopup,
  CloseUpdatePopup,
  error,
}) => {
  const messages = {
    add: {
      success: 'Exercise passed for admin verification',
      error: 'Error occured during passing exercise for admin verification',
    },
    delete: {
      success: 'Exercise deleted successfuly',
      error: 'Error occured during deleting exercise',
    },
    update: {
      success: 'Updated passed for admin verification',
      error: 'Error occured during updating exercise',
    },
  };

  const getMessage = () => {
    if (error) {
      if (addStatus) return messages.add.error;
      if (deleteStatus) return messages.delete.error;
      if (updateStatus) return messages.update.error;
    }
    if (addStatus) return messages.add.success;
    if (deleteStatus) return messages.delete.success;
    if (updateStatus) return messages.update.success;
  };

  const closeMessage = () => {
    if (addStatus) CloseAddPopup();
    if (deleteStatus) CloseDeletePopup();
    if (updateStatus) CloseUpdatePopup();
  };

  return (
    <Box
      sx={{
        width: '100vw',
        position: 'fixed',
        bottom: '20px',
        zIndex: '5',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Collapse
        sx={{ width: '50%' }}
        in={addStatus || deleteStatus || updateStatus}
      >
        <Alert
          variant="filled"
          severity={error ? 'error' : 'success'}
          action={
            <IconButton
              color="inherit"
              size="medium"
              onClick={() => closeMessage()}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {getMessage()}
        </Alert>
      </Collapse>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  addStatus: getAddStatus(state),
  deleteStatus: getDeleteStatus(state),
  updateStatus: getUpdateStatus(state),
  error: getError(state),
});

const mapDispatchToProps = {
  CloseAddPopup,
  CloseDeletePopup,
  CloseUpdatePopup,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseAlert);

ExerciseAlert.propTypes = {
  addStatus: PropTypes.bool,
  deleteStatus: PropTypes.bool,
  updateStatus: PropTypes.bool,
  CloseAddPopup: PropTypes.func,
  CloseDeletePopup: PropTypes.func,
  CloseUpdatePopup: PropTypes.func,
  error: PropTypes.bool,
};

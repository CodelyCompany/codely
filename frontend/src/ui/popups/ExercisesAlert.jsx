/* eslint-disable arrow-body-style */
import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, Collapse } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { getError } from '../../ducks/exercises/selectors';
import {
  ChangeAddStatus,
  ChangeDeleteStatus,
  ChangeUpdateStatus,
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
  ChangeAddStatus,
  ChangeDeleteStatus,
  ChangeUpdateStatus,
  error,
}) => {
  const messages = {
    add: {
      success: 'Exercise addded successfuly',
      error: 'Error occured during adding exercise',
    },
    delete: {
      success: 'Exercise deleted successfuly',
      error: 'Error occured during deleting exercise',
    },
    update: {
      success: 'Exercise updated successfuly',
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
    if (addStatus) ChangeAddStatus();
    if (deleteStatus) ChangeDeleteStatus();
    if (updateStatus) ChangeUpdateStatus();
  };

  //to do: add triggering delete and update

  return (
    <Box
      sx={{
        width: '50vw',
        position: 'absolute',
        bottom: '20px',
        zIndex: '5',
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <Collapse in={addStatus || deleteStatus || updateStatus}>
        <Alert
          variant='filled'
          severity={'success'}
          action={
            <IconButton
              color='inherit'
              size='medium'
              onClick={() => closeMessage()}
            >
              <CloseIcon fontSize='inherit' />
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
  ChangeAddStatus,
  ChangeUpdateStatus,
  ChangeDeleteStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseAlert);

ExerciseAlert.propTypes = {
  addStatus: PropTypes.bool,
  deleteStatus: PropTypes.bool,
  updateStatus: PropTypes.bool,
  ChangeAddStatus: PropTypes.func,
  ChangeDeleteStatus: PropTypes.func,
  ChangeUpdateStatus: PropTypes.func,
  error: PropTypes.bool,
};

/* eslint-disable arrow-body-style */
import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, Collapse } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import {
  getAddStatus,
  getDeleteStatus,
  getUpdateStatus,
} from '../../ducks/popups/selectors';

const ExerciseAlert = ({ addStatus, deleteStatus, updateStatus }) => {
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
              onClick={() => console.log('xd')}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Hi
        </Alert>
      </Collapse>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  addStatus: getAddStatus(state),
  deleteStatus: getDeleteStatus(state),
  updateStatus: getUpdateStatus(state),
});

export default connect(mapStateToProps)(ExerciseAlert);

ExerciseAlert.propTypes = {
  addStatus: PropTypes.bool,
  deleteStatus: PropTypes.bool,
  updateStatus: PropTypes.bool,
};

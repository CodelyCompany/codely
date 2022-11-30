import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { DeleteExercise } from '../../ducks/exercises/operations';
import { ChangeDeleteStatus } from '../../ducks/popups/actions';
import { getToken } from '../../ducks/token/selectors';
import GetToken from '../user/GetToken';

const Confirmation = ({
  open,
  setOpen,
  DeleteExercise,
  ChangeDeleteStatus,
  token,
}) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const deleteExercise = () => {
    DeleteExercise(id, token);
    ChangeDeleteStatus();
    navigate('/exercises');
  };

  return (
    <div>
      <GetToken />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Delete confirmation'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this exercise?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deleteExercise} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: getToken(state),
});

const mapDispatchToProps = {
  DeleteExercise,
  ChangeDeleteStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);

Confirmation.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  DeleteExercise: PropTypes.func,
  ChangeDeleteStatus: PropTypes.func,
  token: PropTypes.string,
};

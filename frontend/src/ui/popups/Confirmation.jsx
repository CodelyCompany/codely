import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
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

const Confirmation = ({
  open,
  setOpen,
  DeleteExercise,
  ChangeDeleteStatus,
}) => {
  const { id } = useParams();

  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const deleteExercise = async () => {
    const token = await getAccessTokenSilently({
      audience: `${process.env.REACT_APP_BACKEND || 'https://localhost:5000'}`,
    });
    await DeleteExercise(id, token);
    ChangeDeleteStatus();
    navigate('/exercises');
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Delete confirmation'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
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

const mapDispatchToProps = {
  DeleteExercise,
  ChangeDeleteStatus,
};

export default connect(null, mapDispatchToProps)(Confirmation);

Confirmation.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  DeleteExercise: PropTypes.func,
  ChangeDeleteStatus: PropTypes.func,
};

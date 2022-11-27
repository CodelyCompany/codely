import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';

import { getUserByUsername } from '../../ducks/user/selectors';

const VersusFound = ({
  open,
  setOpen,
  socket,
  id,
  DisconnectSocket,
  accepted,
  setAccepted,
}) => {
  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname));

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    DisconnectSocket();
    setOpen(false);
    socket.emit('game-close', id);
    socket.disconnect();
  };

  const handleAccept = () => {
    socket.emit(
      'game-accept',
      JSON.stringify({ roomId: id, userId: foundUser._id })
    );
    setAccepted(true);
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Versus found!'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {accepted ? (
              'Waiting for your opponent.'
            ) : (
              <>
                <span style={{ color: 'green' }}>
                  We found an opponent for you!{' '}
                </span>{' '}
                If you are ready to compete with your opponent, please accept
                the game.
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            color="error"
            disabled={accepted}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAccept}
            autoFocus
            variant="contained"
            color="success"
            disabled={accepted}
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VersusFound;

VersusFound.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  socket: PropTypes.object,
  id: PropTypes.string,
  DisconnectSocket: PropTypes.func.isRequired,
  accepted: PropTypes.bool,
  setAccepted: PropTypes.func.isRequired,
};

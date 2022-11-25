import React from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { PropTypes } from 'prop-types';

const VersusFound = ({ open, setOpen, socket, id, setSocket }) => {
  const handleClose = () => {
    setSocket(null);
    setOpen(false);
    socket.emit('game-close', id);
    socket.disconnect();
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
            <Typography style={{ color: 'green' }}>
              We found an opponent for you!
            </Typography>{' '}
            If you are ready to compete with your opponent, please accept the
            game.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancel
          </Button>
          <Button
            onClick={handleClose}
            autoFocus
            variant="contained"
            color="success"
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
  id: PropTypes.string.isRequired,
  setSocket: PropTypes.func.isRequired,
};

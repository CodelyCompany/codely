import React, { forwardRef } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';
import { PropTypes } from 'prop-types';

import lostImage from '../../../coffin-dance.png';
import wonImage from '../../../easy-peasy.png';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FinishDialog = ({ open, setOpen, won }) => {
  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{
            fontWeight: 'bolder',
            color: won ? 'green' : 'red',
            fontSize: '30px',
            borderBottom: won ? '3px solid green' : '3px solid red',
            margin: '10px 20px',
          }}
        >
          {won ? 'You win!' : 'You lose!'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{ fontSize: '20px' }}
          >
            {won
              ? 'You solved this exercise faster than your opponent. Congrats!'
              : 'You solved this exercise slower than your opponent. Better luck next time!'}
            {won ? (
              <img src={wonImage} alt="easy peasy image" />
            ) : (
              <img src={lostImage} alt="coffin dance image" />
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color={won ? 'success' : 'error'}
            variant="contained"
          >
            Quit
          </Button>
          <Button
            onClick={handleClose}
            color={won ? 'success' : 'error'}
            variant="contained"
          >
            Find new versus
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FinishDialog;

FinishDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  won: PropTypes.bool.isRequired,
};

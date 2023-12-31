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
import lostImage from 'coffin-dance.png';
import { DisconnectSocket } from 'ducks/socket/actions';
import wonImage from 'easy-peasy.png';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const FinishDialog = ({ open, setOpen, won, DisconnectSocket }) => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setOpen(false);
  };

  const handleQuit = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    DisconnectSocket();
    setOpen(false);
    navigate('/user');
  };

  const handleFindNewVersus = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    DisconnectSocket();
    setOpen(false);
    navigate('/versus');
  };

  return (
    <div id='versus-finish-dialog'>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle
          id='dialog-title'
          sx={{
            color: won ? 'green' : 'red',
            borderBottom: won ? '3px solid green' : '3px solid red',
          }}
        >
          {won ? t('victory-message') : t('defeat-message')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            {won
              ? t(
                  'victory-follow-up-message'
                )
              : t(
                  'defeat-follow-up-message'
                )}
            {won ? (
              <img id='versus-image' src={wonImage} alt='easy peasy image' />
            ) : (
              <img id='versus-image' src={lostImage} alt='coffin dance image' />
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleQuit}
            color={won ? 'success' : 'error'}
            variant='contained'
          >
            {t('quit-label')}
          </Button>
          <Button
            onClick={handleFindNewVersus}
            color={won ? 'success' : 'error'}
            variant='contained'
          >
            {t('play-again-label')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapDispatchToProps = {
  DisconnectSocket,
};

export default connect(null, mapDispatchToProps)(FinishDialog);

FinishDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  won: PropTypes.bool.isRequired,
  DisconnectSocket: PropTypes.func.isRequired,
};

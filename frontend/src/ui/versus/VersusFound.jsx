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
import { getUserByUsername } from 'ducks/user/selectors';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const VersusFound = ({
  open,
  setOpen,
  socket,
  id,
  DisconnectSocket,
  accepted,
  setAccepted,
  language,
}) => {
  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname));
  const { t } = useTranslation();

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    socket.emit('game-close', id);
    socket.disconnect();
    DisconnectSocket();
    setOpen(false);
  };

  const handleAccept = () => {
    socket.emit(
      'game-accept',
      JSON.stringify({ roomId: id, userId: foundUser._id, language })
    );
    setAccepted(true);
  };

  return (
    <Box id='found-versus-dialog'>
      <Dialog
        className='red-text'
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{t('Versus found!')}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {accepted ? (
              t('Waiting for your opponent.')
            ) : (
              <>
                <span className='green-text'>
                  {t('We found an opponent for you!')}{' '}
                </span>{' '}
                {t(
                  `If you are ready to compete with your opponent, please accept the game.`
                )}
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant='contained'
            color='error'
            disabled={accepted}
          >
            {t('Cancel')}
          </Button>
          <Button
            onClick={handleAccept}
            autoFocus
            variant='contained'
            color='success'
            disabled={accepted}
          >
            {t('Accept')}
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
  language: PropTypes.string,
};

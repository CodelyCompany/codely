import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DeleteExercise } from 'ducks/exercises/operations';
import useToken from 'helpers/useToken';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Confirmation = ({ open, setOpen, DeleteExercise }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { token } = useToken();
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const deleteExercise = () => {
    DeleteExercise(id, token);
    navigate('/exercises');
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {t('delete-confirmation')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {t('exercise-delete-confirmation')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('cancel-label')}</Button>
          <Button onClick={deleteExercise} autoFocus>
            {t('delete-label')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapDispatchToProps = {
  DeleteExercise,
};

export default connect(null, mapDispatchToProps)(Confirmation);

Confirmation.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  DeleteExercise: PropTypes.func,
};

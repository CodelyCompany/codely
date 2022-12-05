import React, { useMemo, useState } from 'react';

import HelpIcon from '@mui/icons-material/Help';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getExerciseById } from '../../ducks/exercises/selectors';

function ExerciseHints() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary.main'
        : 'primary.main',
    [localStorage.getItem('theme')]
  );
  const { id } = useParams();

  const exercise = useSelector(getExerciseById(id));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getNextHint = () => {
    setHintNumber((prev) => prev + 1);
  };

  const [hintNumber, setHintNumber] = useState(0);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <HelpIcon
        sx={{
          curosor: 'pointer',
          color,
        }}
        fontSize='large'
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {`${t('Hint:')} ${hintNumber + 1} / ${exercise.hints.length}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {exercise.hints[hintNumber]}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {hintNumber + 1 !== exercise.hints.length && (
            <Button onClick={getNextHint}>{t('Next')}</Button>
          )}
          <Button onClick={handleClose} autoFocus>
            {t('Close')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default connect(null, null)(ExerciseHints);

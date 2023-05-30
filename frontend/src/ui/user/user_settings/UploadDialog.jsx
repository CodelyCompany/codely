import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';

function UploadDialog({ open, handleAbort, handleUpload }) {
  const { t } = useTranslation();

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleAbort}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{t('are-you-sure-message')}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {t(
              'file-choice-confirmation'
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAbort}>{t('go-back-label')}</Button>
          <Button onClick={handleUpload}>{t('upload-label')}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UploadDialog;

UploadDialog.propTypes = {
  open: PropTypes.bool,
  handleAbort: PropTypes.func,
  handleUpload: PropTypes.func,
};

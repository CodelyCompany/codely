import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { PropTypes } from 'prop-types';

function UploadDialog({ open, handleAbort, handleUpload }) {

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleAbort}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            If you picked a wrong file, this is the last chance to go back!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAbort}>Go back</Button>
          <Button onClick={handleUpload}>Upload</Button>
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
import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { PropTypes } from 'prop-types';

const CustomTypes = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add other type / custom type</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Here you can add other type which wasn't mentioned in the list.
              Moreover you can add your own type fe. Fraction`}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="type"
            label="Type"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomTypes;

CustomTypes.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

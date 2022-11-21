import React, { useEffect, useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import * as _ from 'lodash';
import { PropTypes } from 'prop-types';

const CustomTypes = ({ open, setOpen, setCustomTypes }) => {
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setType('');
  }, [open]);

  const [type, setType] = useState('');

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
            onChange={(e) => setType(e.target.value)}
            value={type}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              setCustomTypes((prev) => _.uniq([...prev, type]));
              handleClose();
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomTypes;

CustomTypes.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setCustomTypes: PropTypes.func.isRequired,
};

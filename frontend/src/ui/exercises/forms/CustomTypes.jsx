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
import { useTranslation } from 'react-i18next';

const CustomTypes = ({ open, setOpen, setCustomTypes }) => {
  const { t } = useTranslation();
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
        <DialogTitle>{t('type-custom-request')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('argument-type-custom-info')}
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='type-label'
            label={t('type-label')}
            type='text'
            fullWidth
            variant='standard'
            onChange={(e) => setType(e.target.value)}
            value={type}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('cancel-label')}</Button>
          <Button
            onClick={() => {
              setCustomTypes((prev) => _.uniq([...prev, type]));
              handleClose();
            }}
          >
            {t('add-label')}
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

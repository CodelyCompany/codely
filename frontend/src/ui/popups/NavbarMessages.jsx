import React from 'react';

import { Popover, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';

const NavbarMessages = ({ anchorEl, setAnchorEl }) => {
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
    </Popover>
  );
};

export default NavbarMessages;

NavbarMessages.propTypes = {
  anchorEl: PropTypes.object,
  setAnchorEl: PropTypes.func.isRequired,
};

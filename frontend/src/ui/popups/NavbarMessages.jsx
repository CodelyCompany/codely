import React from 'react';

import { Box, Popover, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { ReadNotification } from '../../ducks/notifications/operations';
import { getToken } from '../../ducks/token/selectors';

const NavbarMessages = ({
  anchorEl,
  setAnchorEl,
  notifications,
  ReadNotification,
  token,
}) => {
  const handleClose = () => {
    setAnchorEl(null);
  };

  const read = (id) => {
    ReadNotification(id, token);
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
      {notifications && notifications.length ? (
        notifications.map((not, index) => (
          <Box
            onClick={() => !not.read && read(not._id)}
            key={not._id}
            sx={{
              borderBottom:
                index !== notifications.length - 1 && '2px solid grey',
              padding: '0 5px',
              position: 'relative',
              backgroundColor: not.read ? 'white' : 'rgb(227, 227, 227)',
            }}
          >
            <Typography
              sx={{
                p: 2,
                position: 'relative',
                top: '4px',
                color: 'rgb(25, 118, 210)',
                fontWeight: 'bolder',
              }}
            >
              {not.content}
            </Typography>
            <Typography
              sx={{
                position: 'absolute',
                top: '0',
                right: '0',
                color: 'gray',
              }}
            >
              {new Date(not.date).toLocaleDateString()}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography color="primary" fontWeight="bolder" padding="10px">
          Your mailbox is empty
        </Typography>
      )}
    </Popover>
  );
};

const mapStateToProps = (state) => ({
  token: getToken(state),
});

const mapDispatchToProps = {
  ReadNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarMessages);

NavbarMessages.propTypes = {
  anchorEl: PropTypes.object,
  setAnchorEl: PropTypes.func.isRequired,
  notifications: PropTypes.array,
  ReadNotification: PropTypes.func.isRequired,
  token: PropTypes.object,
};

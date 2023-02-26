import React, { useMemo } from 'react';

import { Box, Popover, Typography } from '@mui/material';
import { ReadNotification } from 'ducks/notifications/operations';
import { getToken } from 'ducks/token/selectors';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

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

  const { t } = useTranslation();

  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary.main'
        : 'primary.main',
    [localStorage.getItem('theme')]
  );

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
            id="navbar-messages-container"
            onClick={() => !not.read && read(not._id)}
            key={not._id}
            sx={{
              borderBottom:
                index !== notifications.length - 1 && '2px solid grey',
              backgroundColor: not.read ? 'white' : 'rgb(227, 227, 227)',
            }}
          >
            <Typography id="message-content" sx={{ color }}>
              {not.content}
            </Typography>
            <Typography id="message-date">
              {new Date(not.date).toLocaleDateString()}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography id="empty-mailbox" sx={{ color }}>
          {t('Your mailbox is empty')}
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

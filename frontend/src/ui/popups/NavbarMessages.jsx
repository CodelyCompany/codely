import React from 'react';

import { Box, Popover, Typography } from '@mui/material';
import { ReadNotification } from 'ducks/notifications/operations';
import { getToken } from 'ducks/token/selectors';
import useTheme from 'helpers/useTheme';
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
  const { color } = useTheme();

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
      {notifications?.length ? (
        notifications.map((not, index) => (
          <Box
            id='navbar-messages-container'
            onClick={() => !not.read && read(not._id)}
            key={not._id}
            sx={{
              borderBottom:
                index !== notifications.length - 1 && '2px solid grey',
              backgroundColor: not.read ? 'white' : 'rgb(227, 227, 227)',
            }}
          >
            <Typography id='message-content' sx={{ color }}>
              {not.accepted
                ? t('exercise-accepted-message')
                : t('exercise-rejected-message')}
              : {not.content}
            </Typography>
            <Typography id='message-date'>
              {new Date(not.date).toLocaleDateString()}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography id='empty-mailbox' sx={{ color }}>
          {t('mailbox-empty-message')}
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

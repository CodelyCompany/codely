import React, { useEffect, useMemo, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { GetNotifications } from 'ducks/notifications/operations';
import {
  getNotifications,
  getUnreadNotificationsQuantity,
} from 'ducks/notifications/selectors';
import { GetReviews } from 'ducks/reviews/operations';
import { AddUser, GetUsers } from 'ducks/user/operations';
import { getUsers } from 'ducks/user/selectors';
import useTheme from 'helpers/useTheme';
import useToken from 'helpers/useToken';
import * as _ from 'lodash';
import logo from 'logo.png';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { IoIosMail } from 'react-icons/io';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import NavbarMessages from 'ui/popups/NavbarMessages';

const Navbar = ({
  GetUsers,
  AddUser,
  users,
  GetReviews,
  unreadNotifications,
  notifications,
  GetNotifications,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { loginWithRedirect, isAuthenticated, logout, user, isLoading } =
    useAuth0();
  const [theme, setTheme] = useState(0);
  const [avatar, setAvatar] = useState(null);
  const { t } = useTranslation();
  const { token } = useToken();

  const foundUser = useMemo(
    () => users.find((usr) => usr.username === user.nickname),
    [users]
  );

  useEffect(() => {
    if (!theme) {
      localStorage.setItem('theme', 0);
      setTheme(0);
    }
  }, []);

  useEffect(() => {
    if (!foundUser) {
      setTheme(parseInt(localStorage.getItem('theme') ?? 0));
      document.body.className = `theme-${parseInt(
        localStorage.getItem('theme')
      )}`;
      return;
    }
    setTheme(foundUser.theme);
    document.body.className = `theme-${foundUser.theme}`;
  }, [foundUser, localStorage.getItem('theme')]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const settings =
    user && user.nickname === 'admin'
      ? ['profile-label', 'admin-panel-label', 'settings-label', 'logout-label']
      : ['profile-label', 'settings-label', 'logout-label'];

  const pages = useMemo(
    () =>
      isAuthenticated
        ? ['editor-label', 'exercises-label', 'versus-label']
        : [],
    [isAuthenticated]
  );

  useEffect(() => {
    if (isAuthenticated) {
      GetUsers(token);
      GetReviews(token);
      if (_.isEmpty(foundUser)) AddUser({ username: user.nickname }, token);
    }
  }, [isAuthenticated, token]);

  useEffect(() => {
    if (users.length) {
      if (!_.isEmpty(foundUser)) {
        GetNotifications(foundUser._id, token);
        setAvatar(foundUser?.avatarFile?.data);
      }
    }
  }, [users]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    navigate(`/${page.split('-')[0]}`);
  };

  const handleCloseUserMenu = (setting) => {
    setting === 'logout-label' &&
      logout({
        returnTo: process.env.REACT_APP_LOGOUT_URL || 'http://localhost:3000',
      });
    setting === 'profile-label' && navigate('/user');
    setting === 'admin-panel-label' && navigate('/admin');
    setting === 'settings-label' && navigate('/settings');
    setAnchorElUser(null);
  };

  const { theme: color } = useTheme();

  return (
    <>
      {!isLoading && (
        <AppBar id='app-bar' color={color}>
          <Container id='app-bar-container' maxWidth='xl'>
            <Toolbar disableGutters>
              <img
                id='logo'
                src={logo}
                alt='codely logo'
                onClick={() => navigate('/')}
              />
              <Box
                id='user-container'
                sx={{
                  display: { xs: 'flex', md: 'none' },
                }}
              >
                <IconButton
                  size='large'
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleOpenNavMenu}
                  color='inherit'
                >
                  {isAuthenticated && <MenuIcon />}
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page}
                      onClick={() => handleCloseNavMenu(page)}
                    >
                      <Typography textAlign='center'>{t(page)}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                id='logo-typography'
                variant='h5'
                noWrap
                component='a'
                onClick={() => navigate('/')}
                sx={{ display: { xs: 'flex', md: 'none' } }}
              >
                CODELY
              </Typography>
              <Box
                id='pages-container'
                sx={{ display: { xs: 'none', md: 'flex' } }}
              >
                {pages.map((page) => (
                  <Button className='page-button' key={page}>
                    <Link className='page-link' to={`/${page.split('-')[0]}`}>
                      {t(page)}
                    </Link>
                  </Button>
                ))}
              </Box>
              {isAuthenticated && (
                <>
                  <Box id='notifications-container'>
                    {unreadNotifications !== 0 && (
                      <div>{unreadNotifications}</div>
                    )}
                    <IoIosMail id='mail-icon' onClick={handleClick} />
                  </Box>

                  <NavbarMessages
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    notifications={notifications}
                  />
                </>
              )}
              <Box id='user-setting'>
                {isAuthenticated && (
                  <Tooltip title='Open settings'>
                    <IconButton id='icon-button' onClick={handleOpenUserMenu}>
                      {avatar ? (
                        // eslint-disable-next-line max-len
                        <Avatar src={`data:image/jpeg;base64,${avatar}`} />
                      ) : (
                        <Avatar />
                      )}
                    </IconButton>
                  </Tooltip>
                )}
                {!isAuthenticated && (
                  <Typography
                    id='login-typography'
                    onClick={() => loginWithRedirect()}
                  >
                    {t('login-label')}
                  </Typography>
                )}

                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleCloseUserMenu(setting)}
                    >
                      <Typography textAlign='center'>{t(setting)}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  users: getUsers(state),
  notifications: getNotifications(state),
  unreadNotifications: getUnreadNotificationsQuantity(state),
});

const mapDispatchToProps = {
  GetUsers,
  AddUser,
  GetReviews,
  GetNotifications,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

Navbar.propTypes = {
  GetUsers: PropTypes.func,
  GetReviews: PropTypes.func,
  AddUser: PropTypes.func,
  users: PropTypes.array,
  unreadNotifications: PropTypes.number,
  notifications: PropTypes.array,
  GetNotifications: PropTypes.func.isRequired,
};

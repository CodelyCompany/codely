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
import * as _ from 'lodash';
import { PropTypes } from 'prop-types';
import { IoIosMail } from 'react-icons/io';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { GetNotifications } from '../ducks/notifications/operations';
import {
  getNotifications,
  getUnreadNotificationsQuantity,
} from '../ducks/notifications/selectors';
import { GetReviews } from '../ducks/reviews/operations';
import { getToken } from '../ducks/token/selectors';
import { AddUser, GetUsers } from '../ducks/user/operations';
import { getUsers } from '../ducks/user/selectors';
import logo from '../logo.png';

import NavbarMessages from './popups/NavbarMessages';
import GetToken from './user/GetToken';

const Navbar = ({
  GetUsers,
  AddUser,
  users,
  GetReviews,
  token,
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
  const [avatarUri, setAvatarUri] = useState(null);

  const foundUser = useMemo(
    () => users.find((usr) => usr.username === user.nickname),
    [users]
  );

  useEffect(() => {
    const theme = localStorage.getItem('theme');
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
      ? ['Profile', 'Admin Panel', 'Settings', 'Logout']
      : ['Profile', 'Settings', 'Logout'];
  const pages = useMemo(
    () => (isAuthenticated ? ['Editor', 'Exercises', 'Versus'] : []),
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
        setAvatarUri(
          `${process.env.REACT_APP_BACKEND || 'http://localhost:5000'}/users/${
            foundUser._id
          }/avatar?${foundUser.avatarTimestamp}`
        );
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
    navigate(`/${page.toLowerCase()}`);
  };

  const handleCloseUserMenu = (setting) => {
    setting === 'Logout' && logout();
    setting === 'Profile' && navigate('/user');
    setting === 'Admin Panel' && navigate('/admin');
    setting === 'Settings' && navigate('/settings');
    setAnchorElUser(null);
  };

  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary'
        : 'primary',
    [localStorage.getItem('theme')]
  );

  return (
    <>
      {!isLoading && (
        <AppBar position='static' color={color}>
          <GetToken />
          <Container maxWidth='xl'>
            <Toolbar disableGutters>
              <img
                id='logo'
                style={{ height: '50px', cursor: 'pointer' }}
                src={logo}
                alt='codely logo'
                onClick={() => navigate('/')}
              />
              <Box
                sx={{
                  flexGrow: 1,
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
                  <MenuIcon />
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
                      <Typography textAlign='center'>{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                variant='h5'
                noWrap
                component='a'
                onClick={() => navigate('/')}
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                CODELY
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                {pages.map((page) => (
                  <Button
                    key={page}
                    sx={{
                      fontWeight: 'bolder',
                      my: 2,
                      color: 'white',
                      display: 'block',
                      ml: '40px',
                    }}
                  >
                    <Link
                      style={{
                        textDecoration: 'none',
                        color: 'white',
                      }}
                      to={`/${page.toLowerCase()}`}
                    >
                      {page}
                    </Link>
                  </Button>
                ))}
              </Box>
              {isAuthenticated && (
                <>
                  <Box sx={{ position: 'relative', marginRight: '35px' }}>
                    {unreadNotifications !== 0 && (
                      <div
                        style={{
                          backgroundColor: 'red',
                          position: 'absolute',
                          top: '0',
                          right: '0',
                          borderRadius: '10px',
                          fontSize: '15px',
                          width: '20px',
                          height: '20px',
                          textAlign: 'center',
                          zIndex: '2',
                        }}
                      >
                        {unreadNotifications}
                      </div>
                    )}
                    <IoIosMail
                      onClick={handleClick}
                      style={{
                        color: users.length && theme ? 'white' : 'primary.main',
                        fontSize: '30px',
                        cursor: 'pointer',
                        position: 'relative',
                        right: '10px',
                        top: '5px',
                        zIndex: '1',
                      }}
                    />
                  </Box>

                  <NavbarMessages
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    notifications={notifications}
                  />
                </>
              )}
              <Box sx={{ flexGrow: 0 }}>
                {isAuthenticated && (
                  <Tooltip title='Open settings'>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar src={avatarUri} />
                    </IconButton>
                  </Tooltip>
                )}
                {!isAuthenticated && (
                  <Typography
                    sx={{ cursor: 'pointer', fontWeight: 'bolder' }}
                    onClick={() => loginWithRedirect()}
                  >
                    LOGIN
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
                      <Typography textAlign='center'>{setting}</Typography>
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
  token: getToken(state),
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
  token: PropTypes.string,
  unreadNotifications: PropTypes.number,
  notifications: PropTypes.array,
  GetNotifications: PropTypes.func.isRequired,
};

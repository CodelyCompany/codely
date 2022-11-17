import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';

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
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { GetReviews } from '../ducks/reviews/operations';
import { getToken } from '../ducks/token/selectors';
import { AddUser, GetUsers } from '../ducks/user/operations';
import { getUsers } from '../ducks/user/selectors';
import logo from '../logo.png';

import GetToken from './user/GetToken';

const Navbar = ({ GetUsers, AddUser, users, GetReviews, token }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const {
    loginWithRedirect,
    isAuthenticated,
    logout,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  const settings =
    user && user.nickname === 'admin'
      ? ['Profile', 'Admin Panel', 'Logout']
      : ['Profile', 'Logout'];
  const pages = useMemo(
    () => (isAuthenticated ? ['Editor', 'Exercises', 'Versus'] : []),
    [isAuthenticated]
  );

  useEffect(() => {
    if (isAuthenticated) {
      GetUsers(token);
      GetReviews(token);
      const foundUser = users.find((usr) => usr.username === user.nickname);
      if (_.isEmpty(foundUser)) AddUser({ username: user.nickname }, token);
    }
  }, [isAuthenticated, token]);

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
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <GetToken />
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            id="logo"
            style={{ height: '50px', cursor: 'pointer' }}
            src={logo}
            alt="codely logo"
            onClick={() => navigate('/')}
          />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
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
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
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
                  style={{ textDecoration: 'none', color: 'white' }}
                  to={`/${page.toLowerCase()}`}
                >
                  {page}
                </Link>
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated && (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User image" />
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
              id="menu-appbar"
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
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  users: getUsers(state),
  token: getToken(state),
});

const mapDispatchToProps = {
  GetUsers,
  AddUser,
  GetReviews,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

Navbar.propTypes = {
  GetUsers: PropTypes.func,
  GetReviews: PropTypes.func,
  AddUser: PropTypes.func,
  users: PropTypes.array,
  token: PropTypes.string,
};

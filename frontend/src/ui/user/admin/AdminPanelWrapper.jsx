import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { PropTypes } from 'prop-types';

import Forbidden from './Forbidden';

const AdminPanelWrapper = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();

  return isAuthenticated && user.nickname === 'admin' ? (
    children
  ) : (
    <Forbidden />
  );
};

export default AdminPanelWrapper;

AdminPanelWrapper.propTypes = {
  children: PropTypes.func,
};

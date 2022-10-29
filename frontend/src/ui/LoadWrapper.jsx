import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Container } from '@mui/system';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-loader-spinner';

import MainPage from './MainPage';

const LoadWrapper = ({ children }) => {
  const { isLoading, isAuthenticated } = useAuth0();

  return isLoading ? (
    <Container
      sx={{
        textAlign: 'center',
        justifyContent: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <ProgressBar
        height="200px"
        width="200px"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor="#3449eb"
        barColor="#51E5FF"
      />
    </Container>
  ) : isAuthenticated ? (
    children
  ) : (
    <MainPage />
  );
};

export default LoadWrapper;

LoadWrapper.propTypes = {
  children: PropTypes.node,
};

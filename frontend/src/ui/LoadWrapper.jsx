import React, { useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Container } from '@mui/system';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-loader-spinner';
import usePopups from 'helpers/usePopups';
import MainPage from 'ui/MainPage';

const LoadWrapper = ({ children }) => {
  const { isLoading, isAuthenticated } = useAuth0();

  const [theme, setTheme] = useState(0);

  const getColors = () => {
    if (!theme || theme === 1) return ['#9a2150', 'hsl(337, 73%, 42%)'];
    return ['#3449eb', '#51E5FF'];
  };
  useEffect(() => {
    setTheme(parseInt(localStorage.getItem('theme')) ?? 0);
  }, []);

  usePopups();

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
        height='200px'
        width='200px'
        ariaLabel='progress-bar-loading'
        wrapperStyle={{}}
        wrapperClass='progress-bar-wrapper'
        borderColor={getColors()[0]}
        barColor={getColors()[1]}
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

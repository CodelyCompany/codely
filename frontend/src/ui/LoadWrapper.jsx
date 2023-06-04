import React, { useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Container } from '@mui/system';
import usePopups from 'helpers/usePopups';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-loader-spinner';
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

  const getContent = () => {
    if (isLoading) {
      return <Container id='loading-wrapper'>
        <ProgressBar
          height='200px'
          width='200px'
          ariaLabel='progress-bar-loading'
          wrapperStyle={{}}
          wrapperClass='progress-bar-wrapper'
          borderColor={getColors()[0]}
          barColor={getColors()[1]}
        />
      </Container>;
    }
    if (isAuthenticated) {
      return children;
    }
    return <MainPage />;
  };

  return getContent();
};
export default LoadWrapper;

LoadWrapper.propTypes = {
  children: PropTypes.node,
};

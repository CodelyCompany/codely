import React, { useEffect, useMemo, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Paper, Typography } from '@mui/material';
import { getToken } from 'ducks/token/selectors';
import { getUserByUsername } from 'ducks/user/selectors';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im';
import { useSelector } from 'react-redux';

const ProgrammingQuotes = () => {
  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname));
  const token = useSelector(getToken);
  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary'
        : 'primary',
    [localStorage.getItem('theme')]
  );
  const useEventSource = (url) => {
    const [data, setData] = useState(null);

    useEffect(() => {
      const source = new EventSourcePolyfill(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      source.onmessage = function logEvents(event) {
        setData(JSON.parse(event.data ?? {}));
      };
      return () => {
        source.close();
      };
    }, []);

    return data;
  };

  const data = useEventSource(
    `${process.env.REACT_APP_BACKEND || 'http://localhost:5000'}/sse`
  );

  return (
    data && (
      <Paper
        id='programming-quotes'
        elevation={3}
        className={foundUser ? `theme-${foundUser.theme}` : `theme-0`}
      >
        <ImQuotesLeft
          id='left-quotes'
          className={foundUser ? `theme-${foundUser.theme}` : `theme-0`}
        />
        <Box id='content-container'>
          <Typography color={{ color }} variant='h6'>
            {data.en}
          </Typography>
          <Box>
            <ImQuotesRight
              id='right-qoutes'
              className={foundUser ? `theme-${foundUser.theme}` : `theme-0`}
            />
          </Box>

          <Typography color={color}>~{data.author}</Typography>
        </Box>
      </Paper>
    )
  );
};

export default ProgrammingQuotes;

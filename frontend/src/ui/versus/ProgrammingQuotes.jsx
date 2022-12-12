import React, { useEffect, useMemo, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Paper, Typography } from '@mui/material';
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im';
import { useSelector } from 'react-redux';

import { getUserByUsername } from '../../ducks/user/selectors';

const ProgrammingQuotes = () => {
  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname));
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
      const source = new EventSource(url);

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
        elevation={3}
        className={foundUser ? `theme-${foundUser.theme}` : `theme-0`}
        style={{
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          marginTop: '50px',
        }}
      >
        <ImQuotesLeft
          className={foundUser ? `theme-${foundUser.theme}` : `theme-0`}
          style={{ height: '40px', width: '40px' }}
        />
        <Box sx={{ marginTop: '40px', width: '100%', textAlign: 'center' }}>
          <Typography
            color={{ color }}
            variant='h6'
            fontWeight='bolder'
            style={{ alignSelf: 'center', width: 'calc(100% - 80px)' }}
          >
            {data.en}
          </Typography>
          <Box width='100%' textAlign='end'>
            <ImQuotesRight
              className={foundUser ? `theme-${foundUser.theme}` : `theme-0`}
              style={{
                height: '40px',
                width: '40px',
              }}
            />
          </Box>

          <Typography color={color} fontWeight='bolder' textAlign='end'>
            ~{data.author}
          </Typography>
        </Box>
      </Paper>
    )
  );
};

export default ProgrammingQuotes;

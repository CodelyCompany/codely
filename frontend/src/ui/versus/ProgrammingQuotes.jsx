import React, { useEffect, useState } from 'react';

import { Box, Paper, Typography } from '@mui/material';
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im';

const ProgrammingQuotes = () => {
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
        style={{
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          marginTop: '50px',
        }}
      >
        <ImQuotesLeft
          style={{ height: '40px', width: '40px', color: 'rgb(25, 118, 210)' }}
        />
        <Box sx={{ marginTop: '40px', width: '100%', textAlign: 'center' }}>
          <Typography
            color='primary'
            variant='h6'
            fontWeight='bolder'
            style={{ alignSelf: 'center', width: 'calc(100% - 80px)' }}
          >
            {data.en}
          </Typography>
          <Box width='100%' textAlign='end'>
            <ImQuotesRight
              style={{
                height: '40px',
                width: '40px',
                color: 'rgb(25, 118, 210)',
              }}
            />
          </Box>

          <Typography color='primary' fontWeight='bolder' textAlign='end'>
            ~{data.author}
          </Typography>
        </Box>
      </Paper>
    )
  );
};

export default ProgrammingQuotes;

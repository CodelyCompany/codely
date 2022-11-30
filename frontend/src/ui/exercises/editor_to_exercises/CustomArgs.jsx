import React, { useEffect } from 'react';

import { Box, TextField, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';

const CustomArgs = ({ args, setArgumentValues, argumentValues }) => {
  useEffect(() => {
    setArgumentValues((prev) =>
      [...Array(args.length).keys()].map((el) => {
        if (prev[el]) return prev[el];
        return '';
      })
    );
  }, []);

  const handleArgumentChange = (event, index) => {
    setArgumentValues((prev) =>
      [...Array(args.length).keys()].map((el) => {
        if (el === index) return event.target.value;
        return prev[el];
      })
    );
  };

  return (
    <Box
      sx={{
        margin: '10px 0',
        borderTop: '3px solid rgb(25, 118, 210)',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          padding: '10px',
          borderLeft: '3px solid  rgb(25, 118, 210)',
          borderRight: '3px solid  rgb(25, 118, 210)',
        }}
      >
        <Typography variant='h6' color='primary' fontWeight='bolder'>
          Function in the code field will be run with values inputted below{' '}
        </Typography>
      </Box>
      <Box>
        {args.map((arg, index) => (
          <TextField
            sx={{ margin: '5px' }}
            value={argumentValues[index] ?? ''}
            label={arg}
            name={arg}
            key={arg}
            onChange={(e) => handleArgumentChange(e, index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CustomArgs;

CustomArgs.propTypes = {
  args: PropTypes.array,
  setArgumentValues: PropTypes.func.isRequired,
  argumentValues: PropTypes.array.isRequired,
};

import React, { useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, TextField, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';

import { getUserByUsername } from '../../../ducks/user/selectors';

const CustomArgs = ({ args, setArgumentValues, argumentValues }) => {
  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname));

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
        borderColor: 'primary.main',
        borderTop: '3px solid',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          padding: '10px',
          borderColor: 'primary.main',
          borderLeft: '3px solid',
          borderRight: '3px solid',
        }}
      >
        <Typography variant='h6' color='primary' fontWeight='bolder'>
          Function in the code field will be run with values inputted below
        </Typography>
      </Box>
      <Box className={`theme-${user.theme}`}>
        {args.map((arg, index) => (
          <TextField
            sx={{ input: { color: 'primary.main', margin: '5px' } }}
            focused={true}
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

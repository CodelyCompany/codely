import React, { useEffect, useMemo } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, TextField, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';

const CustomArgs = ({ args, setArgumentValues, argumentValues }) => {
  const { user } = useAuth0();
  const { t } = useTranslation();

  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary.main'
        : 'primary.main',
    [localStorage.getItem('theme')]
  );
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
        borderColor: color,
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
          borderColor: color,
          borderLeft: '3px solid',
          borderRight: '3px solid',
        }}
      >
        <Typography variant='h6' sx={{ color }} fontWeight='bolder'>
          {t(
            'Function in the code field will be run with values inputted below'
          )}
        </Typography>
      </Box>
      <Box className={`theme-${user.theme}`}>
        {args.map((arg, index) => (
          <TextField
            color={color.split('.')[0]}
            sx={{ input: { color, margin: '5px' } }}
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
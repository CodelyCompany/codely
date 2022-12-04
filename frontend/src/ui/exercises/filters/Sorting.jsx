import React, { useMemo } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { getUserByUsername } from '../../../ducks/user/selectors';

function Sorting({ setSort, sort }) {
  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary'
        : 'primary',
    [localStorage.getItem('theme')]
  );

  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname)) ?? {
    theme: 0,
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel sx={{ color: `${color}.main` }} id='select-label'>
          Sort by:
        </InputLabel>
        <Select
          color={color}
          labelId='select-label'
          id={`select-${foundUser.theme}`}
          value={sort}
          label='Sort by'
          onChange={(e) => setSort(parseInt(e.target.value))}
        >
          <MenuItem value={0}>Default</MenuItem>
          <MenuItem value={1}>Title asc</MenuItem>
          <MenuItem value={2}>Title desc</MenuItem>
          <MenuItem value={3}>Difficulty asc</MenuItem>
          <MenuItem value={4}>Difficulty desc</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default Sorting;

Sorting.propTypes = {
  setSort: PropTypes.func.isRequired,
  sort: PropTypes.number,
};

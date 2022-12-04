import React, { useMemo } from 'react';

import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';

function Sorting({ setSort, sort }) {
  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary'
        : 'primary',
    [localStorage.getItem('theme')]
  );

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel color={color} id='select-label'>
          Sort by:
        </InputLabel>
        <Select
          color={color}
          labelId='select-label'
          id='select'
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

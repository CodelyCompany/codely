import React from 'react';

import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';

function Sorting({ setSort, sort }) {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel sx={{ color: 'primary.main' }} id='select-label'>
          Sort by:
        </InputLabel>
        <Select
          sx={{ color: 'primary.main' }}
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

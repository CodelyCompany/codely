import React from 'react';

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from '@mui/material';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getExercisesQuantity } from '../../ducks/exercises/selectors';

const PaginationExercises = ({
  quantity,
  page,
  setPage,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const handleChange = (_event, value) => {
    setPage(value);
  };

  const availableItemsPerPage = [
    ...[...Array(48).keys()].map((number) => number + 3),
  ];

  const handleItemsChange = (e) => {
    setItemsPerPage(e.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: '10px',
      }}
    >
      <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
        <InputLabel id='demo-select-small'>Items per page</InputLabel>
        <Select
          labelId='select-small'
          id='select-small'
          value={itemsPerPage}
          label='Items per page'
          onChange={handleItemsChange}
        >
          {availableItemsPerPage.map((el) => (
            <MenuItem key={el} value={el}>
              {el}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Pagination
        sx={{ margin: '20px' }}
        page={page}
        onChange={handleChange}
        count={parseInt(Math.ceil(quantity / itemsPerPage))}
        color='primary'
      />
    </Box>
  );
};

const mapStateToProps = (state) => ({
  quantity: getExercisesQuantity(state),
});

export default connect(mapStateToProps, null)(PaginationExercises);

PaginationExercises.propTypes = {
  quantity: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  setItemsPerPage: PropTypes.func.isRequired,
};

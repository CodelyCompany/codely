import React from 'react';

import Pagination from '@mui/material/Pagination';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getExercisesQuantity } from '../../ducks/exercises/selectors';

const PaginationExercises = ({ quantity, page, setPage }) => {
  const handleChange = (_event, value) => {
    setPage(value);
  };

  return (
    <Pagination
      page={page}
      onChange={handleChange}
      count={parseInt(Math.ceil(quantity / 8))}
      color="primary"
    />
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
};

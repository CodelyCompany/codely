import React, { useEffect } from 'react';

import { Box, Container } from '@mui/material';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { GetExercises } from '../../ducks/exercises/operations';
import { getExercisesFromState } from '../../ducks/exercises/selectors';

import Exercise from './Exercise';
import Pagination from './Pagination';

const ExercisesList = ({ exercises, GetExercises }) => {
  useEffect(() => {
    GetExercises();
  }, []);

  return (
    <Container>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {exercises.map((exercise) => (
          <Exercise key={exercise._id} exercise={exercise} />
        ))}
      </Box>
      <Pagination />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  exercises: getExercisesFromState(state),
});

const mapDispatchToProps = {
  GetExercises,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesList);

ExercisesList.propTypes = {
  exercises: PropTypes.array.isRequired,
  GetExercises: PropTypes.func.isRequired,
};

import React, { useEffect, useState } from 'react';

import { Box, Container } from '@mui/material';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { GetExercises } from '../../ducks/exercises/operations';
import { getExercisesFromState } from '../../ducks/exercises/selectors';

import Exercise from './Exercise';
import PaginationExercises from './PaginationExercises';

const ExercisesList = ({ exercises, GetExercises }) => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const goToExercisesForm = () => {
    navigate('/Exercises/form');
  };

  useEffect(() => {
    GetExercises();
  }, []);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Button
        onClick={goToExercisesForm}
        variant="contained"
        sx={{ margin: '10px', width: '100%' }}
      >
        Create your exercise!
      </Button>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        {exercises.slice((page - 1) * 8, page * 8).map((exercise) => (
          <Exercise key={exercise._id} exercise={exercise} />
        ))}
      </Box>
      <PaginationExercises page={page} setPage={setPage} />
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

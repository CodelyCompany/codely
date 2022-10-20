import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { GetExercises } from '../../ducks/exercises/operations';
import { getExercisesFromState } from '../../ducks/exercises/selectors';

const ExercisesList = ({ exercises, GetExercises }) => {
  useEffect(() => {
    GetExercises();
  }, []);

  return <div>{console.log(exercises)}ExercisesList</div>;
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

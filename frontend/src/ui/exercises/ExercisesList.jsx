import React, { useEffect, useState } from 'react';

import { Box, Container } from '@mui/material';
import { Button } from '@mui/material';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { GetExercises } from '../../ducks/exercises/operations';
import { getExercisesFromState } from '../../ducks/exercises/selectors';

import Filters from './filters/Filters';
import Exercise from './Exercise';
import PaginationExercises from './PaginationExercises';

const ExercisesList = ({ exercises, GetExercises }) => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    title: '',
    languages: [],
    difficulty: [],
  });
  const [sort, setSort] = useState(0);
  const navigate = useNavigate();

  const goToExercisesForm = () => {
    navigate('/Exercises/form');
  };

  const getReversed = (condition, array) =>
    condition ? _.reverse(array) : array;

  useEffect(() => {
    console.log(exercises[0]);
    GetExercises();
  }, []);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '70vh',
      }}
    >
      {console.log(sort)}
      <Button
        onClick={goToExercisesForm}
        variant="contained"
        sx={{ margin: '10px', width: '100%' }}
      >
        Create your exercise!
      </Button>
      <Filters
        setFilters={setFilters}
        filters={filters}
        setSort={setSort}
        sort={sort}
      />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          height: '100%',
          width: '100%',
          flexDirection: 'row',
          alignItems: 'space-between',
        }}
      >
        {getReversed(
          sort === 2 || sort === 4,
          _.sortBy(
            exercises
              .filter((ex) =>
                filters.title
                  ? new RegExp(`.*${filters.title}.*`).test(ex.title)
                  : true
              )
              .filter((ex) =>
                !_.isEmpty(filters.languages)
                  ? filters.languages.includes(
                      ex.programmingLanguage.toLowerCase()
                    )
                  : true
              )
              .filter((ex) =>
                !_.isEmpty(filters.difficulty)
                  ? filters.difficulty.includes(ex.difficulty)
                  : true
              ),
            sort === 0
              ? []
              : sort === 1 || sort === 2
              ? ['title']
              : ['difficulty']
          )
        )
          .slice((page - 1) * 8, page * 8)
          .map((exercise) => (
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

import React, { useEffect, useMemo, useState } from 'react';

import { Box, Container } from '@mui/material';
import { Button } from '@mui/material';
import { GetExercises } from 'ducks/exercises/operations';
import { getExercisesFromState } from 'ducks/exercises/selectors';
import useToken from 'helpers/useToken';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Exercise from 'ui/exercises/Exercise';
import Filters from 'ui/exercises/filters/Filters';
import PaginationExercises from 'ui/exercises/PaginationExercises';

const ExercisesList = ({ exercises, GetExercises }) => {
  const { t } = useTranslation();
  const { token } = useToken();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    title: '',
    languages: [],
    difficulty: [],
  });
  const [sort, setSort] = useState(0);
  const navigate = useNavigate();
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary.main'
        : 'primary.main',
    [localStorage.getItem('theme')]
  );
  const goToExercisesForm = () => {
    navigate('/Exercises/form');
  };

  const getReversed = (condition, array) =>
    condition ? _.reverse(array) : array;

  useEffect(() => {
    if (_.isEmpty(exercises)) {
      GetExercises(token);
    }
  }, [token]);

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button
          onClick={goToExercisesForm}
          variant='contained'
          color={color.split('.')[0]}
          sx={{ margin: '10px', width: '100%' }}
        >
          {t('Create your exercise!')}
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
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((exercise) => (
              <Exercise key={exercise._id} exercise={exercise} />
            ))}
        </Box>
        <PaginationExercises
          page={page}
          setPage={setPage}
          setItemsPerPage={setItemsPerPage}
          itemsPerPage={itemsPerPage}
        />
      </Container>
    </>
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

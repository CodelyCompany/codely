import React, { useEffect, useState } from 'react';

import { Box, Container } from '@mui/material';
import { Button } from '@mui/material';
import { GetExercises } from 'ducks/exercises/operations';
import { getExercisesFromState } from 'ducks/exercises/selectors';
import usePageTitle from 'helpers/usePageTitle';
import useTheme from 'helpers/useTheme';
import useToken from 'helpers/useToken';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Exercise from 'ui/exercises/Exercise';
import Filters from 'ui/exercises/filters/Filters';
import PaginationExercises from 'ui/exercises/PaginationExercises';

import Pages from 'consts/pages';

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
  const { theme } = useTheme();
  usePageTitle(Pages.EXERCISES);

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
      <Container id='exercises-list-container'>
        <Button
          onClick={goToExercisesForm}
          variant='contained'
          color={theme}
        >
          {t('Create your exercise!')}
        </Button>
        <Filters
          setFilters={setFilters}
          filters={filters}
          setSort={setSort}
          sort={sort}
        />
        <Box id='exercises-wrapper'>
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

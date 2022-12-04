import React, { useEffect, useMemo, useState } from 'react';

import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { getExercisesFromState } from '../../../ducks/exercises/selectors';

import Sorting from './Sorting';

function Filters({ exercises, setFilters, setSort, sort }) {
  const { t } = useTranslation();
  const getTitles = () => exercises.map((el) => el.title);
  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary'
        : 'primary',
    [localStorage.getItem('theme')]
  );
  const languages = ['JavaScript', 'Bash', 'C', 'C++', 'Java', 'Python', 'R'];

  const [autocompleteValue, setAutocompleteValue] = useState('');
  const [inputAutocompleteValue, setInputAutocompleteValue] = useState('');

  useEffect(() => {
    setFilters((prev) => ({ ...prev, title: autocompleteValue }));
  }, [autocompleteValue]);

  const filterByLanguage = (event) => {
    const language = event.target.value;
    setFilters((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((lang) => lang !== language)
        : [...prev.languages, language],
    }));
  };

  const filterByDifficultyLevel = (event) => {
    const difficulty = parseInt(event.target.value);
    setFilters((prev) => ({
      ...prev,
      difficulty: prev.difficulty.includes(difficulty)
        ? prev.difficulty.filter((diff) => diff !== difficulty)
        : [...prev.difficulty, difficulty],
    }));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Autocomplete
          color={color}
          disablePortal
          id='combo-box'
          options={getTitles()}
          value={autocompleteValue}
          onChange={(event, newValue) => {
            setAutocompleteValue(newValue);
          }}
          inputValue={inputAutocompleteValue}
          onInputChange={(event, newInputValue) => {
            setInputAutocompleteValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              color={color}
              {...params}
              label={
                <Typography color={color}>{t('Search exercise')}</Typography>
              }
            />
          )}
        />
      </Box>
      <Box>
        <Typography>{t('Filter by language:')}</Typography>
        {languages.map((language) => (
          <FormControlLabel
            key={language}
            control={
              <Checkbox
                color={color}
                value={language.toLowerCase()}
                onClick={filterByLanguage}
              />
            }
            label={language}
          />
        ))}
      </Box>
      <Box>
        <Typography>{t('Filter by difficulty level:')}</Typography>
        {[...Array(5).keys()].map((number) => (
          <FormControlLabel
            key={number + 1}
            control={
              <Checkbox
                color={color}
                value={number + 1}
                onChange={filterByDifficultyLevel}
              />
            }
            label={number + 1}
          />
        ))}
      </Box>
      <Sorting setSort={setSort} sort={sort} />
    </Box>
  );
}

const mapStateToProps = (state) => ({
  exercises: getExercisesFromState(state),
});

export default connect(mapStateToProps, null)(Filters);

Filters.propTypes = {
  exercises: PropTypes.array.isRequired,
  setFilters: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  setSort: PropTypes.func.isRequired,
  sort: PropTypes.number.isRequired,
};

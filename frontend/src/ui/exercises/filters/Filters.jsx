import React, { useEffect, useState } from 'react';

import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import { getExercisesFromState } from 'ducks/exercises/selectors';
import useTheme from 'helpers/useTheme';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Sorting from 'ui/exercises/filters/Sorting';

function Filters({ exercises, setFilters, setSort, sort }) {
  const { t } = useTranslation();
  const getTitles = () => exercises.map((el) => el.title);
  const { theme } = useTheme();
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
    <Box id='filters-wrapper'>
      <Box>
        <Autocomplete
          color={theme}
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
              color={theme}
              {...params}
              label={
                <Typography color={theme}>{t('Search exercise')}</Typography>
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
                color={theme}
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
                color={theme}
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

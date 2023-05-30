import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getUserByUsername } from 'ducks/user/selectors';
import useTheme from 'helpers/useTheme';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

function Sorting({ setSort, sort }) {
  const { t } = useTranslation();
  const { theme, color } = useTheme();
  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname)) ?? {
    theme: 0,
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel sx={{ color }} id='select-label'>
          {t('sort-by-label')}
        </InputLabel>
        <Select
          color={theme}
          labelId='select-label'
          id={`select-${foundUser.theme}`}
          value={sort}
          label={t('sort-by-label')}
          onChange={(e) => setSort(parseInt(e.target.value))}
        >
          <MenuItem value={0}>{t('default-label')}</MenuItem>
          <MenuItem value={1}>{t('title-ascending-option')}</MenuItem>
          <MenuItem value={2}>{t('title-descending-option')}</MenuItem>
          <MenuItem value={3}>{t('difficulty-ascending-option')}</MenuItem>
          <MenuItem value={4}>{t('difficulty-descending-option')}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default Sorting;

Sorting.propTypes = {
  setSort: PropTypes.func.isRequired,
  sort: PropTypes.number,
};

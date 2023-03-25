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
          {t('Sort by')}
        </InputLabel>
        <Select
          color={theme}
          labelId='select-label'
          id={`select-${foundUser.theme}`}
          value={sort}
          label={t('Sort by')}
          onChange={(e) => setSort(parseInt(e.target.value))}
        >
          <MenuItem value={0}>{t('Default')}</MenuItem>
          <MenuItem value={1}>{t('Title asc')}</MenuItem>
          <MenuItem value={2}>{t('Title desc')}</MenuItem>
          <MenuItem value={3}>{t('Difficulty asc')}</MenuItem>
          <MenuItem value={4}>{t('Difficulty desc')}</MenuItem>
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

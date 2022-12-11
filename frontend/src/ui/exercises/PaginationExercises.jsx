import React, { useMemo } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';

import { getExercisesQuantity } from '../../ducks/exercises/selectors';
import { getUserByUsername } from '../../ducks/user/selectors';

const PaginationExercises = ({
  quantity,
  page,
  setPage,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const { t } = useTranslation();
  const handleChange = (_event, value) => {
    setPage(value);
  };

  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname)) ?? {
    theme: 0,
  };

  const availableItemsPerPage = [
    ...[...Array(48).keys()].map((number) => number + 3),
  ];

  const handleItemsChange = (e) => {
    setItemsPerPage(e.target.value);
  };

  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary'
        : 'primary',
    [localStorage.getItem('theme')]
  );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: '10px',
      }}
    >
      <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
        <InputLabel sx={{ color: `${color}.main` }} id='demo-select-small'>
          {t('Items per page')}
        </InputLabel>
        <Select
          color={color}
          labelId='select-small'
          id={`select-small-${foundUser.theme}`}
          value={itemsPerPage}
          label={t('Items per page')}
          onChange={handleItemsChange}
        >
          {availableItemsPerPage.map((el) => (
            <MenuItem key={el} value={el}>
              {el}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Pagination
        color={color}
        sx={{ margin: '20px' }}
        page={page}
        onChange={handleChange}
        count={parseInt(Math.ceil(quantity / itemsPerPage))}
      />
    </Box>
  );
};

const mapStateToProps = (state) => ({
  quantity: getExercisesQuantity(state),
});

export default connect(mapStateToProps, null)(PaginationExercises);

PaginationExercises.propTypes = {
  quantity: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  setItemsPerPage: PropTypes.func.isRequired,
};

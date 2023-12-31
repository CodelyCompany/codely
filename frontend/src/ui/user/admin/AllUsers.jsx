import React, { useEffect, useMemo } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Card, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DataGrid } from '@mui/x-data-grid';
import { GetUsers } from 'ducks/user/operations';
import { getUserByUsername, getUsers } from 'ducks/user/selectors';
import useTheme from 'helpers/useTheme';
import useToken from 'helpers/useToken';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';

const useStyles = makeStyles({
  root: {
    '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
      outline: 'none',
    },
  },
});

function AllUsers({ users, GetUsers }) {
  const { t } = useTranslation();
  const { user } = useAuth0();
  const { token } = useToken();
  const foundUser = useSelector(getUserByUsername(user.nickname)) ?? {
    theme: 0,
  };
  const { color } = useTheme();

  const classes = useStyles();

  useEffect(() => {
    if (users.length) GetUsers(token);
  }, [token]);

  const rows = useMemo(() => (users ? users : []), [users]);

  const columns = [
    {
      field: 'username',
      headerName: t('username-label'),
      flex: 1,
    },
    {
      field: 'creationDate',
      headerName: t('creation-date-label'),
      flex: 1,
    },
    {
      field: 'reviews',
      headerName: t('written-reviews-label'),
      flex: 1,
    },
    {
      field: 'preparedExercises',
      headerName: t('prepared-exercises-label'),
      flex: 1,
    },
    {
      field: 'solvedExercises',
      headerName: t('solved-exercises-label'),
      flex: 1,
    },
  ];

  return (
    <Card id='all-users-table-container' className={`theme-${foundUser.theme}`}>
      <Typography id='registered-users-typography' sx={{ color }} variant='h6'>
        {t('registered-users-label')}
      </Typography>
      <DataGrid
        className={`${classes.root} all-users-table`}
        sx={{ borderColor: color, color }}
        getRowId={(row) => row._id}
        rows={rows.map((row) => ({
          ...row,
          creationDate: new Date(row.creationDate).toLocaleDateString(),
          reviews: row.writtenReviews ? row.writtenReviews.length : 0,
          preparedExercises: row.preparedExercises
            ? row.preparedExercises.length
            : 0,
          solvedExercises: row.doneExercises ? row.doneExercises.length : 0,
        }))}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Card>
  );
}

const mapStateToProps = (state) => ({
  users: getUsers(state),
});

const mapDispatchToProps = {
  GetUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);

AllUsers.propTypes = {
  users: PropTypes.array,
  GetUsers: PropTypes.func,
};

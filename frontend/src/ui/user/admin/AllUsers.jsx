import React from 'react';
import { useEffect, useMemo } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Card, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DataGrid } from '@mui/x-data-grid';
import { GetUsers } from 'ducks/user/operations';
import { getUserByUsername, getUsers } from 'ducks/user/selectors';
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
  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary.main'
        : 'primary.main',
    [localStorage.getItem('theme')]
  );

  const classes = useStyles();

  useEffect(() => {
    if (users.length) GetUsers(token);
  }, [token]);

  const rows = useMemo(() => (users ? users : []), [users]);

  const columns = [
    {
      field: 'username',
      headerName: t('Username'),
      flex: 1,
    },
    {
      field: 'creationDate',
      headerName: t('Creation date'),
      flex: 1,
    },
    {
      field: 'reviews',
      headerName: t('Written reviews'),
      flex: 1,
    },
    {
      field: 'preparedExercises',
      headerName: t('Prepared exercises'),
      flex: 1,
    },
    {
      field: 'solvedExercises',
      headerName: t('Solved exercises'),
      flex: 1,
    },
  ];

  return (
    <Card id='all-users-table-container' className={`theme-${foundUser.theme}`}>
      <Typography id='registered-users-typography' sx={{ color }} variant='h6'>
        {t('Registered users')}
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

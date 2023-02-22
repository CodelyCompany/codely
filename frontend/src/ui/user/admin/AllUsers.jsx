import React from 'react';
import { useEffect, useMemo } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Card, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DataGrid } from '@mui/x-data-grid';
import { getToken } from 'ducks/token/selectors';
import { GetUsers } from 'ducks/user/operations';
import { getUserByUsername, getUsers } from 'ducks/user/selectors';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';
import GetToken from 'ui/user/GetToken';

const useStyles = makeStyles({
  root: {
    '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
      outline: 'none',
    },
  },
});

function AllUsers({ users, GetUsers, token }) {
  const { t } = useTranslation();
  const { user } = useAuth0();
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
    <Card
      className={`theme-${foundUser.theme}`}
      sx={{ height: '100%', margin: '10px', padding: '10px' }}
    >
      <GetToken />
      <Typography
        sx={{ color }}
        fontWeight={'bolder'}
        variant='h6'
        textAlign={'center'}
      >
        {t('Registered users')}
      </Typography>
      <DataGrid
        className={classes.root}
        sx={{
          width: 'calc(100% - 20px)',
          height: '300px',
          margin: '10px',
          borderColor: color,
          color,
        }}
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
  token: getToken(state),
});

const mapDispatchToProps = {
  GetUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);

AllUsers.propTypes = {
  users: PropTypes.array,
  GetUsers: PropTypes.func,
  token: PropTypes.string,
};

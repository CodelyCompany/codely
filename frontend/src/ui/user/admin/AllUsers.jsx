import React from 'react';
import { useEffect, useMemo } from 'react';

import { Card, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import _ from 'lodash';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { getUsers } from '../../../ducks/user/selectors';

function AllUsers({ users, getUsers }) {
  useEffect(() => {
    if (_.isEmpty(users)) getUsers();
  }, []);

  const rows = useMemo(() => (users ? users : []), [users]);

  const columns = [
    {
      field: 'username',
      headerName: 'Username',
      flex: 1,
    },
    {
      field: 'creationDate',
      headerName: 'Creation date',
      flex: 1,
    },
    {
      field: 'reviews',
      headerName: 'Written reviews',
      flex: 1,
    },
    {
      field: 'preparedExercises',
      headerName: 'Prepared exercises',
      flex: 1,
    },
    {
      field: 'solvedExercises',
      headerName: 'Solved exercises',
      flex: 1,
    },
  ];

  return (
    <Card sx={{ height: '100%', margin: '10px', padding: '10px' }}>
      {console.log(users)}
      <Typography
        color='primary'
        fontWeight={'bolder'}
        variant='h6'
        textAlign={'center'}
      >
        Registered users
      </Typography>
      <DataGrid
        sx={{ width: 'calc(100% - 20px)', height: '300px', margin: '10px' }}
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
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);

AllUsers.propTypes = {
  users: PropTypes.array,
  getUsers: PropTypes.func,
};

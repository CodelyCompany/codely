import React, { useEffect, useMemo } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Card, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as _ from 'lodash';
import { PropTypes } from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { GetExercises } from '../../../ducks/exercises/operations';
import { getExercisesFromState } from '../../../ducks/exercises/selectors';
import { getToken } from '../../../ducks/token/selectors';
import { getUserByUsername } from '../../../ducks/user/selectors';
import GetToken from '../GetToken';

const columns = [
  {
    field: 'title',
    headerName: 'Title',
    flex: 1,
  },
  {
    field: 'author',
    headerName: 'Author',
    flex: 1,
  },
];

function CheckedExercise({ checkedExercises, GetExercises, token }) {
  const rows = useMemo(
    () => (checkedExercises ? checkedExercises : []),
    [checkedExercises]
  );
  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary.main'
        : 'primary.main',
    [localStorage.getItem('theme')]
  );
  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname));

  const navigate = useNavigate();

  useEffect(() => {
    GetExercises(token);
  }, [token]);

  return (
    <Card
      className={`theme-${foundUser.theme}`}
      sx={{
        height: '500px',
        width: '50%',
        margin: '10px',
        padding: '10px',
      }}
    >
      <GetToken />
      <Typography
        variant='h6'
        sx={{ fontWeight: 'bolder', textAlign: 'center', color }}
      >
        Checked exercises
      </Typography>
      <DataGrid
        sx={{
          borderColor: color,
          width: 'calc(100% - 20px)',
          height: '400px',
          margin: '10px',
          color,
        }}
        getRowId={(row) => row._id}
        rows={rows.map((row) => ({
          ...row,
          author: row.author.username,
        }))}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        onCellClick={(data) => navigate(`/exercise/${data.row._id}`)}
      />
    </Card>
  );
}

const mapStateToProps = (state) => ({
  checkedExercises: getExercisesFromState(state),
  token: getToken(state),
});

const mapDispatchToProps = {
  GetExercises,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckedExercise);

CheckedExercise.propTypes = {
  checkedExercises: PropTypes.array,
  GetExercises: PropTypes.func,
  token: PropTypes.string,
};

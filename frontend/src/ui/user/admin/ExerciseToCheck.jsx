import React, { useEffect, useMemo, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Card, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { PropTypes } from 'prop-types';
import { connect, useSelector } from 'react-redux';

import { GetUncheckedExercises } from '../../../ducks/exercises/operations';
import { getUncheckedExercises } from '../../../ducks/exercises/selectors';
import { getToken } from '../../../ducks/token/selectors';
import { getUserByUsername } from '../../../ducks/user/selectors';

import ExerciseDialog from './ExerciseDialog';

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

function ExerciseToCheck({ uncheckedExercises, GetUncheckedExercises, token }) {
  const rows = useMemo(
    () => (uncheckedExercises ? uncheckedExercises : []),
    [uncheckedExercises]
  );
  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname));
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary.main'
        : 'primary.main',
    [localStorage.getItem('theme')]
  );
  const handleClickOpen = (ex) => {
    setSelected(ex.row);
    setOpen(true);
  };

  useEffect(() => {
    GetUncheckedExercises(token);
  }, [token]);

  return (
    <>
      <Card
        className={`theme-${foundUser.theme}`}
        sx={{
          height: '500px',
          width: '50%',
          margin: '10px',
          padding: '10px',
        }}
      >
        <Typography
          variant='h6'
          sx={{ fontWeight: 'bolder', textAlign: 'center', color }}
        >
          Exercises to check
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
          onCellClick={(row) => handleClickOpen(row)}
        />
      </Card>
      <ExerciseDialog open={open} setOpen={setOpen} exercise={selected} />
    </>
  );
}

const mapStateToProps = (state) => ({
  uncheckedExercises: getUncheckedExercises(state),
  token: getToken(state),
});

const mapDispatchToProps = {
  GetUncheckedExercises,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseToCheck);

ExerciseToCheck.propTypes = {
  uncheckedExercises: PropTypes.array,
  GetUncheckedExercises: PropTypes.func,
  token: PropTypes.string,
};

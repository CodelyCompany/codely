import React, { useEffect, useMemo, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Card, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as _ from 'lodash';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { GetUncheckedExercises } from '../../../ducks/exercises/operations';
import { getUncheckedExercises } from '../../../ducks/exercises/selectors';

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

function ExerciseToCheck({ uncheckedExercises, GetUncheckedExercises }) {
  const { getAccessTokenSilently } = useAuth0();
  const rows = useMemo(
    () => (uncheckedExercises ? uncheckedExercises : []),
    [uncheckedExercises]
  );
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});

  const handleClickOpen = (ex) => {
    setSelected(ex.row);
    setOpen(true);
  };

  useEffect(() => {
    if (_.isEmpty(uncheckedExercises))
      (async () => {
        const token = await getAccessTokenSilently({
          audience: `${
            process.env.REACT_APP_BACKEND || 'http://localhost:5000'
          }`,
        });
        await GetUncheckedExercises(token);
      })();
  }, []);

  return (
    <>
      <Card
        sx={{ height: '500px', width: '50%', margin: '10px', padding: '10px' }}
      >
        <Typography
          color='primary'
          variant='h6'
          sx={{ fontWeight: 'bolder', textAlign: 'center' }}
        >
          Exercises to check
        </Typography>
        <DataGrid
          sx={{ width: 'calc(100% - 20px)', height: '400px', margin: '10px' }}
          getRowId={(row) => row._id}
          rows={rows.map((row) => ({ ...row, author: row.author.username }))}
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
});

const mapDispatchToProps = {
  GetUncheckedExercises,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseToCheck);

ExerciseToCheck.propTypes = {
  uncheckedExercises: PropTypes.array,
  GetUncheckedExercises: PropTypes.func,
};

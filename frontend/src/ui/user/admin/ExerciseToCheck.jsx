import React, { useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as _ from 'lodash';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { GetUncheckedExercises } from '../../../ducks/exercises/operations';
import { getUncheckedExercises } from '../../../ducks/exercises/selectors';

const columns = [
  {
    field: 'title',
    headerName: 'Title',
    width: 150,
  },
  {
    field: 'author',
    headerName: 'Author',
    width: 150,
  },
];

function ExerciseToCheck({ uncheckedExercises, GetUncheckedExercises }) {
  const { getAccessTokenSilently } = useAuth0();
  const rows = uncheckedExercises ? [...uncheckedExercises] : [];

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
    <Box sx={{ height: 400, width: '100%' }}>
      <Typography color='primary' variant='h6' sx={{ fontWeight: 'bolder' }}>
        Exercises to check
      </Typography>
      <DataGrid
        sx={{ width: '305px' }}
        getRowId={(row) => row._id}
        rows={rows.map((row) => ({ ...row, author: row.author.username }))}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        onCellClick={(row) => console.log(row)}
      />
    </Box>
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

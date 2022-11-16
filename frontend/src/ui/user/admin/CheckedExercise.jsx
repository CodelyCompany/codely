import React, { useEffect, useMemo } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Card, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as _ from 'lodash';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { GetExercises } from '../../../ducks/exercises/operations';
import { getExercisesFromState } from '../../../ducks/exercises/selectors';

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

function CheckedExercise({ checkedExercises, GetExercises }) {
  const { getAccessTokenSilently } = useAuth0();
  const rows = useMemo(
    () => (checkedExercises ? checkedExercises : []),
    [checkedExercises]
  );

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently({
        audience: `${
          process.env.REACT_APP_BACKEND || 'https://localhost:5000'
        }`,
      });
      await GetExercises(token);
    })();
  }, []);

  return (
    <Card
      sx={{
        height: '500px',
        width: '50%',
        margin: '10px',
        padding: '10px',
      }}
    >
      <Typography
        color="primary"
        variant="h6"
        sx={{ fontWeight: 'bolder', textAlign: 'center' }}
      >
        Checked exercises
      </Typography>
      <DataGrid
        sx={{
          width: 'calc(100% - 20px)',
          height: '400px',
          margin: '10px',
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
});

const mapDispatchToProps = {
  GetExercises,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckedExercise);

CheckedExercise.propTypes = {
  checkedExercises: PropTypes.array,
  GetExercises: PropTypes.func,
};

import React, { useEffect, useMemo } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Card, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GetExercises } from 'ducks/exercises/operations';
import { getExercisesFromState } from 'ducks/exercises/selectors';
import { getUserByUsername } from 'ducks/user/selectors';
import useToken from "helpers/useToken";
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CheckedExercise({ checkedExercises, GetExercises }) {
  const { t } = useTranslation();
  const { token } = useToken();
  const rows = useMemo(
    () => (checkedExercises ? checkedExercises : []),
    [checkedExercises]
  );

  const columns = [
    {
      field: 'title',
      headerName: t('Title'),
      flex: 1,
    },
    {
      field: 'author',
      headerName: t('Author'),
      flex: 1,
    },
  ];

  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary.main'
        : 'primary.main',
    [localStorage.getItem('theme')]
  );
  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname)) ?? {
    theme: 0,
  };

  const navigate = useNavigate();

  useEffect(() => {
    GetExercises(token);
  }, [token]);

  return (
    <Card
      id="checked-exercises-table-container"
      className={`theme-${foundUser.theme}`}
    >
      <Typography
        id="checked-exercises-typography"
        variant='h6'
        sx={{ color }}
      >
        {t('Checked exercises')}
      </Typography>
      <DataGrid
        className="checked-exercises-table"
        sx={{ borderColor: color, color }}
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

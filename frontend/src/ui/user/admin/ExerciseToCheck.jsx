import React, { useEffect, useMemo, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Card, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DataGrid } from '@mui/x-data-grid';
import { GetUncheckedExercises } from 'ducks/exercises/operations';
import { getUncheckedExercises } from 'ducks/exercises/selectors';
import { getToken } from 'ducks/token/selectors';
import { getUserByUsername } from 'ducks/user/selectors';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';
import ExerciseDialog from 'ui/user/admin/ExerciseDialog';

const useStyles = makeStyles({
  root: {
    '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
      outline: 'none',
    },
  },
});

function ExerciseToCheck({ uncheckedExercises, GetUncheckedExercises, token }) {
  const { t } = useTranslation();
  const rows = useMemo(
    () => (uncheckedExercises ? uncheckedExercises : []),
    [uncheckedExercises]
  );
  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname)) ?? {
    theme: 0,
  };

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

  const classes = useStyles();

  useEffect(() => {
    GetUncheckedExercises(token);
  }, [token]);

  return (
    <>
      <Card
        id='exercises-to-check-table-container'
        className={`theme-${foundUser?.theme}`}
      >
        <Typography
          id='exercises-to-check-typography'
          variant='h6'
          sx={{ color }}
        >
          {t('Exercises to check')}
        </Typography>
        <DataGrid
          className={`${classes.root} exercises-to-check-table`}
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

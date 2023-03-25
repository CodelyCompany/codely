import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import Editor from '@monaco-editor/react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItemText,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  CheckExercise,
  DeleteUncheckedExercise,
} from 'ducks/exercises/operations';
import { AddNotification } from 'ducks/notifications/operations';
import { getUserByUsername, getUsers } from 'ducks/user/selectors';
import useTheme from 'helpers/useTheme';
import useToken from 'helpers/useToken';
import _ from 'lodash';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';

function ExerciseDialog({
  open,
  setOpen,
  exercise,
  CheckExercise,
  DeleteUncheckedExercise,
  AddNotification,
  users,
}) {
  const { t } = useTranslation();
  const { user } = useAuth0();
  const { token } = useToken();
  const foundUser = useSelector(getUserByUsername(user.nickname));
  const checkExercise = () => {
    const userToNotify = users.find((usr) => usr.username === exercise.author);
    AddNotification(userToNotify._id, {
      content: `${t('Admin accepted your exercise')}: ${exercise.title}`,
    });
    CheckExercise(exercise._id, token);
    handleClose();
  };
  const { color, theme } = useTheme();
  const handleClose = () => {
    setOpen(false);
  };

  const deleteExercise = () => {
    const userToNotify = users.find((usr) => usr.username === exercise.author);
    AddNotification(userToNotify._id, {
      content: `${t('Admin rejected your exercise')}: ${exercise.title}`,
    });
    DeleteUncheckedExercise(exercise._id, token);
    setOpen(false);
  };

  const columns = [
    {
      field: 'input',
      headerName: t('Inputs'),
      flex: 1,
    },
    {
      field: 'output',
      headerName: t('Outputs'),
      flex: 1,
    },
  ];

  return (
    <div>
      {!_.isEmpty(exercise) && (
        <Dialog
          id='exercise-dialog'
          fullWidth
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle
            sx={{ borderColor: color, color }}
            id='alert-dialog-title'
          >
            {t(`Checking exercise`)}
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color }} id='alert-dialog-description'>
              <strong>{t('Title')}:</strong> {exercise.title}
            </DialogContentText>
            <DialogContentText sx={{ color }} id='alert-dialog-description'>
              <strong>{t('Author')}:</strong> {exercise.author}
            </DialogContentText>
            <DialogContentText sx={{ color }} id='alert-dialog-description'>
              <strong>{t('Programming language')}:</strong>{' '}
              {exercise.programmingLanguage}
            </DialogContentText>
            <DialogContentText sx={{ color }} id='alert-dialog-description'>
              <strong>{t('Creation date')}:</strong>{' '}
              {new Date(exercise.creationDate).toLocaleDateString()}
            </DialogContentText>
            <DialogContentText sx={{ color }} id='alert-dialog-description'>
              <strong>{t('Description')}:</strong> {exercise.description}
            </DialogContentText>
            <DialogContentText sx={{ color }} id='alert-dialog-description'>
              <strong>{t('Difficulty')}:</strong> {exercise.difficulty} / 5
            </DialogContentText>
            <div id='alert-dialog-description'>
              <strong
                style={{
                  color:
                    foundUser.theme !== 2 ? '#9a2150' : 'rgb(25, 118, 210)',
                }}
              >
                {t('Hints:')}
              </strong>
              {exercise.hints.map((hint, index) => (
                <ListItemText sx={{ color }} key={index}>
                  <strong>-</strong> {hint}
                </ListItemText>
              ))}
            </div>
            <DialogContentText sx={{ color }}>
              <strong>{t('Tests:')}</strong>
            </DialogContentText>
            <DataGrid
              className='exercise-dialog-tests-table'
              sx={{ borderColor: color }}
              rows={exercise.tests.map((el) => ({
                ...el,
                input: el.input.join(', '),
              }))}
              getRowId={(row) => row._id}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
            <DialogContentText sx={{ color }} id='alert-dialog-description'>
              {t('Example solution:')}
            </DialogContentText>
            <Box
              id='exercise-dialog-editor-container'
              sx={{ borderColor: color }}
            >
              <Editor
                height='200px'
                width='100%'
                language={
                  exercise.programmingLanguage.toLowerCase() === 'c++'
                    ? 'cpp'
                    : exercise.programmingLanguage.toLowerCase()
                }
                value={exercise.exampleSolution}
              />
            </Box>
          </DialogContent>
          <DialogActions id='alert-dialog-actions'>
            <Button
              color={theme}
              variant='contained'
              onClick={handleClose}
              id={'undo'}
            >
              {t('Undo')}
            </Button>
            <Box>
              <Button
                color={theme}
                variant='contained'
                onClick={() => deleteExercise()}
                id={'reject'}
              >
                {t('Reject')}
              </Button>
              <Button
                color={theme}
                variant='contained'
                onClick={() => checkExercise()}
                autoFocus
                id={'accept'}
              >
                {t('Accept')}
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  users: getUsers(state),
});

const mapDispatchToProps = {
  CheckExercise,
  DeleteUncheckedExercise,
  AddNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseDialog);

ExerciseDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  exercise: PropTypes.object,
  CheckExercise: PropTypes.func,
  DeleteUncheckedExercise: PropTypes.func,
  AddNotification: PropTypes.func.isRequired,
  users: PropTypes.array,
};

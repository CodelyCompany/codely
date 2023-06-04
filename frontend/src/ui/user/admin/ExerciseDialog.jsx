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
import { v4 as uuidv4 } from 'uuid';

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
      content: exercise.title,
      accepted: true,
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
      content: exercise.title,
    });
    DeleteUncheckedExercise(exercise._id, token);
    setOpen(false);
  };

  const columns = [
    {
      field: 'input',
      headerName: t('inputs-label'),
      flex: 1,
    },
    {
      field: 'output',
      headerName: t('outputs-label'),
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
            {t('exercise-verification-header')}
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color }} id='alert-dialog-description'>
              <strong>{t('title-label')}:</strong> {exercise.title}
            </DialogContentText>
            <DialogContentText sx={{ color }} id='alert-dialog-description'>
              <strong>{t('author-label')}:</strong> {exercise.author}
            </DialogContentText>
            <DialogContentText sx={{ color }} id='alert-dialog-description'>
              <strong>{t('programming-language-label')}:</strong>{' '}
              {exercise.programmingLanguage}
            </DialogContentText>
            <DialogContentText sx={{ color }} id='alert-dialog-description'>
              <strong>{t('creation-date-label')}:</strong>{' '}
              {new Date(exercise.creationDate).toLocaleDateString()}
            </DialogContentText>
            <DialogContentText sx={{ color }} id='alert-dialog-description'>
              <strong>{t('description-label')}:</strong> {exercise.description}
            </DialogContentText>
            <DialogContentText sx={{ color }} id='alert-dialog-description'>
              <strong>{t('difficulty-label')}:</strong> {exercise.difficulty} /
              5
            </DialogContentText>
            <div id='alert-dialog-description'>
              <strong
                style={{
                  color:
                    foundUser.theme !== 2 ? '#9a2150' : 'rgb(25, 118, 210)',
                }}
              >
                {t('hints-listing-label')}
              </strong>
              {exercise.hints.map((hint) => (
                <ListItemText sx={{ color }} key={`hint-${uuidv4()}`}>
                  <strong>-</strong> {hint}
                </ListItemText>
              ))}
            </div>
            <DialogContentText sx={{ color }}>
              <strong>{t('tests-listing-label')}</strong>
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
              {t('example-solution-label')}
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
              {t('undo-label')}
            </Button>
            <Box>
              <Button
                color={theme}
                variant='contained'
                onClick={() => deleteExercise()}
                id={'reject'}
              >
                {t('reject-label')}
              </Button>
              <Button
                color={theme}
                variant='contained'
                onClick={() => checkExercise()}
                autoFocus
                id={'accept'}
              >
                {t('accept-label')}
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

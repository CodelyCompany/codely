import * as React from 'react';

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
import { PropTypes } from 'prop-types';
import { connect, useSelector } from 'react-redux';

import {
  CheckExercise,
  DeleteUncheckedExercise,
} from '../../../ducks/exercises/operations';
import { AddNotification } from '../../../ducks/notifications/operations';
import { getToken } from '../../../ducks/token/selectors';
import { getUserByUsername, getUsers } from '../../../ducks/user/selectors';
import GetToken from '../GetToken';

function ExerciseDialog({
  open,
  setOpen,
  exercise,
  CheckExercise,
  token,
  DeleteUncheckedExercise,
  AddNotification,
  users,
}) {
  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname));
  const checkExercise = () => {
    const userToNotify = users.find((usr) => usr.username === exercise.author);
    AddNotification(userToNotify._id, {
      content: `Admin accepted your exercise: ${exercise.title}`,
    });
    CheckExercise(exercise._id, token);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteExercise = () => {
    const userToNotify = users.find((usr) => usr.username === exercise.author);
    AddNotification(userToNotify._id, {
      content: `Admin rejected your exercise: ${exercise.title}`,
    });
    DeleteUncheckedExercise(exercise._id, token);
    setOpen(false);
  };

  const columns = [
    {
      field: 'input',
      headerName: 'Inputs',
      flex: 1,
    },
    {
      field: 'output',
      headerName: 'Outputs',
      flex: 1,
    },
  ];

  return (
    <div>
      <GetToken />
      {!_.isEmpty(exercise) && (
        <Dialog
          fullWidth
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle
            color='primary'
            fontWeight={'bolder'}
            sx={{
              borderColor: 'primary.main',
              borderBottom: '3px solid',
              margin: '0 10px 10px 10px',
            }}
            id='alert-dialog-title'
          >
            {`Checking exercise`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText color='primary' id='alert-dialog-description'>
              <strong>Title:</strong> {exercise.title}
            </DialogContentText>
            <DialogContentText color='primary' id='alert-dialog-description'>
              <strong>Author:</strong> {exercise.author}
            </DialogContentText>
            <DialogContentText color='primary' id='alert-dialog-description'>
              <strong>Programming language:</strong>{' '}
              {exercise.programmingLanguage}
            </DialogContentText>
            <DialogContentText color='primary' id='alert-dialog-description'>
              <strong>Creation date:</strong>{' '}
              {new Date(exercise.creationDate).toLocaleDateString()}
            </DialogContentText>
            <DialogContentText color='primary' id='alert-dialog-description'>
              <strong>Description:</strong> {exercise.description}
            </DialogContentText>
            <DialogContentText color='primary' id='alert-dialog-description'>
              <strong>Difficulty:</strong> {exercise.difficulty} / 5
            </DialogContentText>
            <div
              id='alert-dialog-description'
              style={{ color: 'rgb(25, 118, 210)' }}
            >
              <strong
                style={{
                  color: foundUser.theme ? '#9a2150' : 'rgb(25, 118, 210)',
                }}
              >
                Hints:
              </strong>
              {exercise.hints.map((hint, index) => (
                <ListItemText sx={{ color: 'primary.main' }} key={index}>
                  <strong>-</strong> {hint}
                </ListItemText>
              ))}
            </div>
            <DialogContentText color='primary'>
              <strong>Tests:</strong>
            </DialogContentText>
            <DataGrid
              sx={{
                width: '100%',
                height: '300px',
                borderColor: 'primary.main',
                border: '3px solid',
                marginBottom: '5px',
              }}
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
            <DialogContentText
              color='primary'
              sx={{ fontWeight: 'bolder' }}
              id='alert-dialog-description'
            >
              Example solution:
            </DialogContentText>
            <Box
              sx={{
                width: '100%',
                borderColor: 'primary.main',
                border: '3px solid',
                borderRadius: '5px',
              }}
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
          <DialogActions
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Button variant='contained' onClick={handleClose}>
              Undo
            </Button>
            <Box>
              <Button
                variant='contained'
                sx={{ marginRight: '10px' }}
                onClick={() => deleteExercise()}
              >
                Reject
              </Button>
              <Button
                variant='contained'
                onClick={() => checkExercise()}
                autoFocus
              >
                Accept
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: getToken(state),
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
  token: PropTypes.string,
  DeleteUncheckedExercise: PropTypes.func,
  AddNotification: PropTypes.func.isRequired,
  users: PropTypes.array,
};

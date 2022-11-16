import * as React from 'react';

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
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CheckExercise } from '../../../ducks/exercises/operations';
import { getToken } from '../../../ducks/token/selectors';
import GetToken from '../GetToken';

function ExerciseDialog({ open, setOpen, exercise, CheckExercise, token }) {
  const navigate = useNavigate();

  const checkExercise = () => {
    CheckExercise(exercise._id, token);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      field: 'input',
      headerName: 'Inputs',
    },
    {
      field: 'output',
      headerName: 'Outputs',
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
              borderBottom: '3px solid rgb(25, 118, 210)',
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
              <strong>Hints:</strong>
              {exercise.hints.map((hint, index) => (
                <ListItemText key={index}>
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
                border: '3px solid rgb(25, 118, 210)',
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
                border: '3px solid rgb(25, 118, 210)',
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
                onClick={handleClose}
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
});

const mapDispatchToProps = {
  CheckExercise,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseDialog);

ExerciseDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  exercise: PropTypes.object,
  CheckExercise: PropTypes.func,
  token: PropTypes.string,
};

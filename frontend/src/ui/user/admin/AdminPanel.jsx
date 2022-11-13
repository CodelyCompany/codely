import React from 'react';

import { Box } from '@mui/material';

import AllUsers from './AllUsers';
import CheckedExercise from './CheckedExercise';
import ExerciseToCheck from './ExerciseToCheck';

const AdminPanel = () => (
  <Box sx={{ width: '100%', height: '100%' }}>
    <Box sx={{ wdith: '100%', display: 'flex' }}>
      <ExerciseToCheck />
      <CheckedExercise />
    </Box>
    <AllUsers />
  </Box>
);

export default AdminPanel;

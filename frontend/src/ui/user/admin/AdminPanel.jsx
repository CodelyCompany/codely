import React from 'react';

import { Box } from '@mui/material';

import CheckedExercise from './CheckedExercise';
import ExerciseToCheck from './ExerciseToCheck';

const AdminPanel = () => (
  <Box sx={{ width: '100%' }}>
    <Box sx={{ wdith: '100%', display: 'flex' }}>
      <ExerciseToCheck />
      <CheckedExercise />
    </Box>
  </Box>
);

export default AdminPanel;

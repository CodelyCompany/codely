import React from 'react';

import { Box } from '@mui/material';

import AdminPanelWrapper from './AdminPanelWrapper';
import AllUsers from './AllUsers';
import CheckedExercise from './CheckedExercise';
import ExerciseToCheck from './ExerciseToCheck';

const AdminPanel = () => (
  <AdminPanelWrapper>
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box id='admin-tables'>
        <ExerciseToCheck />
        <CheckedExercise />
      </Box>
      <AllUsers />
    </Box>
  </AdminPanelWrapper>
);

export default AdminPanel;

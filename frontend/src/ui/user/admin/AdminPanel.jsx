import React from 'react';

import { Box } from '@mui/material';
import AdminPanelWrapper from 'ui/user/admin/AdminPanelWrapper';
import AllUsers from 'ui/user/admin/AllUsers';
import CheckedExercise from 'ui/user/admin/CheckedExercise';
import ExerciseToCheck from 'ui/user/admin/ExerciseToCheck';

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

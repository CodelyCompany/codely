import React from 'react';

import { Box } from '@mui/material';
import usePageTitle from 'helpers/usePageTitle';
import AdminPanelWrapper from 'ui/user/admin/AdminPanelWrapper';
import AllUsers from 'ui/user/admin/AllUsers';
import CheckedExercise from 'ui/user/admin/CheckedExercise';
import ExerciseToCheck from 'ui/user/admin/ExerciseToCheck';

import Pages from 'consts/pages';

const AdminPanel = () => {
  usePageTitle(Pages.ADMIN_PANEL);

  return (
    <AdminPanelWrapper>
      <Box id='admin-panel-wrapper'>
        <Box id='admin-tables'>
          <ExerciseToCheck />
          <CheckedExercise />
        </Box>
        <AllUsers />
      </Box>
    </AdminPanelWrapper>
  );
};

export default AdminPanel;

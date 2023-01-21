import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material';
import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import { SnackbarProvider } from 'notistack';
import { initReactI18next } from 'react-i18next';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import languages from './config/languages';
import Editor from './ui/code_editor/Editor';
import ExerciseDetail from './ui/exercises/ExerciseDetail';
import ExercisesList from './ui/exercises/ExercisesList';
import MainForm from './ui/exercises/forms/MainForm';
import LoadWrapper from './ui/LoadWrapper';
import MainPage from './ui/MainPage';
import Navbar from './ui/Navbar';
import AdminPanel from './ui/user/admin/AdminPanel';
import Settings from './ui/user/user_settings/Settings';
import UserDetails from './ui/user/UserDetails';
import Exercise from './ui/versus/solving_exercise/Exercise';
import Versus from './ui/versus/Versus';
import { theme } from './conf';

i18next
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: languages || 'en',
    fallbackLng: 'en',
    ns: ['main'],
    defaultNS: 'main',
    react: {
      wait: true,
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

const AppRoutes = () => {
  const themeObj = createTheme(theme);

  return (
    <BrowserRouter>
      <ThemeProvider theme={themeObj}>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}>
          <Navbar />
          <LoadWrapper>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/editor' element={<Editor />} />
              <Route path='/exercises' element={<ExercisesList />} />
              <Route path='/exercise/:id' element={<ExerciseDetail />} />
              <Route path='/exercises/form' element={<MainForm />} />
              <Route path='/exercises/edit/:id' element={<MainForm />} />
              <Route path='/versus' element={<Versus />} />
              <Route
                path='/versus/room/:roomId/exercise/:id'
                element={<Exercise />}
              />
              <Route path='/user' element={<UserDetails />} />
              <Route path='/admin' element={<AdminPanel />} />
              <Route path='/settings' element={<Settings />} />
            </Routes>
          </LoadWrapper>
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;

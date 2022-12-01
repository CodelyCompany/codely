import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Editor from './ui/code_editor/Editor';
import ExerciseDetail from './ui/exercises/ExerciseDetail';
import ExercisesList from './ui/exercises/ExercisesList';
import MainForm from './ui/exercises/forms/MainForm';
import LoadWrapper from './ui/LoadWrapper';
import MainPage from './ui/MainPage';
import Navbar from './ui/Navbar';
import ExerciseAlert from './ui/popups/ExercisesAlert';
import AdminPanel from './ui/user/admin/AdminPanel';
import Settings from './ui/user/user_settings/Settings';
import UserDetails from './ui/user/UserDetails';
import Exercise from './ui/versus/solving_exercise/Exercise';
import Versus from './ui/versus/Versus';

import './styles/css/styles.css';
import './App.css';

export const secondTheme = {
  palette: {
    type: 'light',
    primary: {
      main: '#9a2150',
      background: 'rgba(0, 0, 0, 0.1)',
    },
    secondary: {
      main: '#f50057',
    },
  },
};

function App() {
  const theme = createTheme(secondTheme);

  return (
    <div className='App'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
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
          <ExerciseAlert />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

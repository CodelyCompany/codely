import React from 'react';

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
import UserDetails from './ui/user/UserDetails';
import Versus from './ui/versus/Versus';

import './styles/css/styles.css';
import './App.css';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <LoadWrapper>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/editor" element={<Editor />} />
                        <Route path="/exercises" element={<ExercisesList />} />
                        <Route
                            path="/exercise/:id"
                            element={<ExerciseDetail />}
                        />
                        <Route path="/exercises/form" element={<MainForm />} />
                        <Route
                            path="/exercises/edit/:id"
                            element={<MainForm />}
                        />
                        <Route path="/versus" element={<Versus />} />
                        <Route path="/user" element={<UserDetails />} />
                        <Route path="/admin" element={<AdminPanel />} />
                    </Routes>
                </LoadWrapper>
                <ExerciseAlert />
            </BrowserRouter>
        </div>
    );
}

export default App;

import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Editor from './ui/code_editor/Editor';
import ExerciseDetail from './ui/exercises/ExerciseDetail';
import ExercisesList from './ui/exercises/ExercisesList';
import LoadWrapper from './ui/LoadWrapper';
import MainPage from './ui/MainPage';
import Navbar from './ui/Navbar';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LoadWrapper>
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/Editor" element={<Editor />} />
            <Route path="/Exercises" element={<ExercisesList />} />
            <Route path="/Exercise/:id" element={<ExerciseDetail />} />
          </Routes>
        </LoadWrapper>
      </BrowserRouter>
    </div>
  );
}

export default App;

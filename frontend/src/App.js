import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Editor from './ui/code_editor/Editor';
import ExercisesList from './ui/exercises/ExercisesList';
import LoadWrapper from './ui/LoadWrapper';
import MainPage from './ui/MainPage';
import Navbar from './ui/Navbar';

import './App.css';

function App() {
  return (
    <LoadWrapper>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/Editor" element={<Editor />} />
            <Route path="/Exercises" element={<ExercisesList />} />
          </Routes>
        </BrowserRouter>
      </div>
    </LoadWrapper>
  );
}

export default App;

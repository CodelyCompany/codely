import './App.css';
import LoadWrapper from './ui/LoadWrapper';
import Navbar from './ui/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './ui/MainPage';
import Editor from './ui/code_editor/Editor';

function App() {
  return (
    <LoadWrapper>
      <div className='App'>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/Editor' element={<Editor />} />
          </Routes>
        </BrowserRouter>
      </div>
    </LoadWrapper>
  );
}

export default App;

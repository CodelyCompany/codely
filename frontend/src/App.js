import './App.css';
import LoadWrapper from './ui/LoadWrapper';
import Navbar from './ui/Navbar';

function App() {
  return (
    <LoadWrapper>
      <div className='App'>
        <Navbar />
      </div>
    </LoadWrapper>
  );
}

export default App;

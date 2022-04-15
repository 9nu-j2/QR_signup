import './App.css';
import Register from './register/Register.js'; 
import Generate from './generate/Generate.js';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/qr' element={<Generate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import './App.css';
import Register from './register/Register.js'; 
import Generate from './generate/Generate.js';
import Wifi from './wifi/Wifi.js';
import Master from './main/Main.js';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Master />} />
          <Route path='/wifi' element={<Wifi />}/>
          <Route path='/waiting' element={<Register />} />
          <Route path='/waiting/qr' element={<Generate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

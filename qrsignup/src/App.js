import './App.css';
import Register from './register/Register.js'; 
import Generate from './generate/Generate.js';
import Wifi from './wifi/Wifi.js';
import Master from './main/Main.js';
import Admin from './adminpage/Admin.js';
import Approve from './approve/Approve.js';
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
          <Route path='/waiting/admin' element={<Admin />} />
          <Route path='/waiting/admin/manage' element={<Approve />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

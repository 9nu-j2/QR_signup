import "./App.css";
import Register from "./register/Register.js";
import Generate from "./generate/Generate.js";
import Wifi from "./wifi/Wifi.js";
import Master from "./main/Main.js";
import Admin from "./adminpage/Admin.js";
import Select from "./select/Select.js";
import Monitor from "./monitor/Monitor.js";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [sessionCheck, sessionChange] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("user_id") === null) {
      // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
      sessionChange(false);
    } else {
      // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
      // 로그인 상태 변경
      sessionChange(true);
    }
    console.log("check");
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Admin isLogin={sessionCheck} />} />
          <Route path="/wifi" element={<Wifi />} />
          <Route path="/waiting" element={<Master isLogin={sessionCheck} />} />
          <Route
            path="/waiting/shop"
            element={<Register isLogin={sessionCheck} />}
          />
          <Route
            path="/waiting/qr"
            element={<Generate isLogin={sessionCheck} />}
          />
          <Route
            path="/waiting/select"
            element={<Select isLogin={sessionCheck} />}
          />
          <Route
            path="/waiting/monitor"
            element={<Monitor isLogin={sessionCheck} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

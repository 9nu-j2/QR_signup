import "./App.css";

import Admin from "./screens/adminpage";
import Select from "./screens/select";
import Monitor from "./screens/monitor";
import Register from "./screens/register";
import Generate from "./screens/generate";
import Wifi from "./screens/wifi";
import Master from "./screens/main";

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
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Admin {...{ sessionCheck }} />} />
          <Route path="/wifi" element={<Wifi />} />
          <Route path="/waiting" element={<Master {...{ sessionCheck }} />} />
          <Route
            path="/waiting/shop"
            element={<Register {...{ sessionCheck }} />}
          />
          <Route
            path="/waiting/qr"
            element={<Generate {...{ sessionCheck }} />}
          />
          <Route
            path="/waiting/select"
            element={<Select {...{ sessionCheck }} />}
          />
          <Route
            path="/waiting/monitor"
            element={<Monitor {...{ sessionCheck }} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

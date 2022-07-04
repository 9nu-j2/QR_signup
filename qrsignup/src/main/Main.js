import "./Main.css";
import mark from "../img/wifi.svg";
import lol from "../img/wq.svg";
import logo from "../img/kt.png";

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Main(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.isLogin === false) {
      navigate("/");
    }
  });
  return (
    <div className="Master">
      <div className="Logo">
        <img src={logo}></img>
      </div>
      <div className="Brand">
        <h1>DIGICO KT</h1>
        <h2>QR Solution</h2>
      </div>
      <div className="Navigation">
        <div className="RightCard">
          <div className="ImagePart">
            <img src={lol} />
          </div>
          <div className="TitlePart">QR Waiting</div>
          <Link to="select">
            <h3>바로가기</h3>
          </Link>
        </div>
        <div className="LeftCard">
          <div className="ImagePart">
            <img src={mark} />
          </div>
          <div className="TitlePart">QR Wifi</div>
          <Link to="/wifi">
            <h3>바로가기</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Main;

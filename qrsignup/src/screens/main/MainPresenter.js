import mark from "../../img/wifi.svg";
import lol from "../../img/wq.svg";
import logo from "../../img/kt.png";

import { Link } from "react-router-dom";

const MainPresenter = () => {
  return (
    <div className="Master">
      <div className="Logo">
        <img src={logo}></img>
      </div>
      <div className="Brand">
        <h1>DIGICO KT</h1>
        <h2>QR Solution</h2>
        <p>
          Qr Waiting 관리자 화면으로 이동하시려면 Qr Waiting, <br /> Qr Wifi
          자동생성 기능을 이용하실 때는 Qr Wifi를 클릭하세요
        </p>
        <p></p>
      </div>
      <div className="Navigation">
        <Link to="select">
          <div className="RightCard">
            <div className="ImagePart">
              <img src={lol} />
            </div>
            <div className="TitlePart">QR Waiting</div>
            <h3>바로가기</h3>
          </div>
        </Link>
        <Link to="/wifi">
          <div className="LeftCard">
            <div className="ImagePart">
              <img src={mark} />
            </div>
            <div className="TitlePart">QR Wifi</div>
            <h3>바로가기</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MainPresenter;

import './Register.css';
import shop from '../img/shop.png'

import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="Div">
      <Left></Left>
      <Right></Right>
    </div>
  );
}

function Left() {
  return (
      <div className="Left">
        <div className="Box">
          <div className="Logo">QR Waiting</div>
          <div className="About">
            <p className="Bigp">가게를 등록하고</p>
            <p className="Bigp">QR코드를 생성하세요</p>
            <p className="Smallp">이 서비스는 QR웨이팅을 사용하시는 점주님들께 제공하는 서비스입니다</p>
            <p className="Smallp">DIGICO KT</p>
          </div>
          <div className="Image"><img src={shop}/></div>
        </div>
      </div>
  );
}

function Right() {
  return (
      <div className="Right">
        <div className="Card">
          <div></div>
          <div>
            <p>ID</p>
            <input typ="text"></input>
          </div>
          <div>
            <p>PASSWORRD</p>
            <input type="password"></input>
          </div>
          <div>
            <p>가게명</p>
            <input type="text"></input>
          </div>
          <div></div>
          <div>
            <Link to="/qr"><button>QR코드 생성하기</button></Link>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
  );
}

export default Register;

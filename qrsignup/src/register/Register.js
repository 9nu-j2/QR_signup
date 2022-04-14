import './Register.css';
import shop from '../img/shop.png'

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
          <div className="Logo">DIGICO KT</div>
          <div className="About">
            <p className="Bigp">가게를 등록하고</p>
            <p className="Bigp">QR코드를 생성하세요</p>
            <p className="Smallp">이 뭐시기는 kt에서 제공하는 뭐시기입니다</p>
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
            <input></input>
          </div>
          <div>
            <p>PASSWORRD</p>
            <input></input>
          </div>
          <div>
            <p>가게명</p>
            <input></input>
          </div>
          <div></div>
          <div>
            <button>QR코드 생성하기</button>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
  );
}

export default Register;

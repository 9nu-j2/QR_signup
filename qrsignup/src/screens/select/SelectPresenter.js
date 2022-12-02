import logo from "../../img/kt.png";
import icon from "../../img/icon.ico";

const SelectPresenter = ({ adminAbout, onClickLogout, navigate }) => {
  return (
    <div className="Master">
      <div className="Logo">
        <img src={logo}></img>
      </div>
      <div className="Half">
        <div className="IconBox">
          <img src={icon}></img>
        </div>
        <p className="AboutAdmin">{sessionStorage.getItem("user_id")}</p>
        <p className="AboutAdmin2">{adminAbout.email}</p>
        <button onClick={onClickLogout}>로그아웃</button>
      </div>
      <div className="AdminSelect">
        <button>
          <div className="AdminMenu" onClick={() => navigate("/waiting/shop")}>
            <p>신규 고객</p>
            <p>등록하기</p>
          </div>
        </button>
        <button>
          <div
            className="AdminMenu"
            onClick={() => navigate("/waiting/monitor")}
          >
            <p>승인 요청</p>
            <p>확인하기</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SelectPresenter;

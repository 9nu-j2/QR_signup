import shop from "../../img/shop.png";
import logo from "../../img/kt.png";

const Left = () => {
  return (
    <div className="Left">
      <div className="Box">
        <div className="LogoTitle">QR Waiting</div>
        <div className="About">
          <p className="Bigp">가게를 등록하고</p>
          <p className="Bigp">QR코드를 생성하세요</p>
          <p className="Smallp">
            QR웨이팅을 사용하시는 점주님들을 위해 QR포스터를 생성하고 출력하세요
          </p>
          <p className="Smallp">DIGICO KT</p>
        </div>
        <div className="Image">
          <img src={shop} />
        </div>
      </div>
    </div>
  );
}; // 왼쪽에서 보여주는 UI

const Right = (props) => {
  function Button() {
    if (props.버튼 === 1) {
      return <button onClick={props.onClickFalse}>QR생성하기 1</button>;
    } else if (props.버튼 === 2) {
      return <button onClick={props.onClickExist}>QR생성하기 2</button>;
    } else if (props.버튼 === 3) {
      return <button onClick={props.onClick}>QR생성하기 3</button>;
    }
  } // 유효성 검사 결과에 따른 버튼 기능 변경

  function CheckId() {
    const style = {
      color: "red",
    };

    if (props.아이디확인 === true) {
      return (
        <div className="Compo">
          <p style={style}>이미 사용중인 아이디이거나 비밀번호가 다릅니다.</p>
          <Button></Button>
        </div>
      );
    } else {
      return (
        <div className="Compo">
          <p></p>
          <Button></Button>
        </div>
      );
    }
  } // 아이디 유효성 검사 결과 출력 컴포넌트

  return (
    <div className="Right">
      <div className="Card">
        <div className="Compo">
          <div className="Notice">
            *서비스 사용 기한은 2개월이며 기한 이후에 연장 신청이 가능합니다
          </div>
        </div>
        <div className="Compo">
          <p>아이디</p>
          <input
            type="text"
            name="id"
            onChange={props.onChangeId}
            value={props.inputs.id}
          ></input>
        </div>
        <div className="Compo">
          <p>비밀번호</p>
          <input
            type="password"
            name="password"
            onChange={props.onChangePw}
            value={props.inputs.password}
          ></input>
        </div>
        <div className="Compo">
          <p>가게명</p>
          <input
            type="text"
            name="name"
            onChange={props.onChangeName}
            value={props.inputs.storename}
          ></input>
        </div>
        <div className="Compo"></div>
        <div className="Compo"></div>
        <CheckId></CheckId>
        <div className="Compo"></div>
      </div>
    </div>
  );
}; // 오른쪽에 보여주는 UI, 실질적인 입력을 받는 부분

const RegisterPresenter = ({
  버튼,
  아이디확인,
  onClickFalse,
  onClickExist,
  onClick,
  onChangeId,
  onChangePw,
  onChangeName,
  inputs,
}) => {
  return (
    <div className="Div">
      <div className="Logo">
        <img src={logo}></img>
      </div>
      <Left></Left>
      <Right
        inputs={inputs}
        onChangeName={onChangeName}
        버튼={버튼}
        아이디확인={아이디확인}
        onClickFalse={onClickFalse}
        onClickExist={onClickExist}
        onClick={onClick}
        onChangeId={onChangeId}
        onChangePw={onChangePw}
      ></Right>
    </div>
  );
};

export default RegisterPresenter;

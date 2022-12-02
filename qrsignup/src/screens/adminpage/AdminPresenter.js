import logo from "../../img/kt.png";

const AdminPresenter = ({ onClick, id, password, onChangeId, onChangePw }) => {
  const Button = () => {
    return <button onClick={onClick}>로그인</button>;
  };

  return (
    <div className="AdminCenter">
      <div className="Logo">
        <img src={logo}></img>
      </div>
      <p>*담당자만 로그인 가능합니다</p>
      <div className="AdminCard">
        <div className="Compo">
          <p>아이디</p>
          <input type="text" name="id" onChange={onChangeId} value={id}></input>
        </div>
        <div className="Compo">
          <p>비밀번호</p>
          <input
            type="password"
            name="password"
            onChange={onChangePw}
            value={password}
          ></input>
        </div>
        <div className="Compo"></div>
        <div className="Compo">
          <Button></Button>
        </div>
      </div>
    </div>
  );
};

export default AdminPresenter;

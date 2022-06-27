import "./Admin.css";

import logo from "../img/kt.png";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { child, get, ref } from "firebase/database";
import { database } from "../firebase";

function Admin(props) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    id: "",
    password: "",
  }); // 멀티 인풋 값을 관리하는 state

  const dbRef = ref(database);

  const { id, password } = inputs;

  useEffect(() => {
    if (props.isLogin === true) {
      navigate("/waiting/select");
    }
  });

  function Button() {
    return <button onClick={onClick}>로그인</button>;
  }

  const onClick = () => {
    get(child(dbRef, "admin/" + `${inputs.id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          if (snapshot.val().password === inputs.password) {
            sessionStorage.setItem("user_id", inputs.id);
          } else {
            console.log("비밀번호가 다릅니다");
          }
        } else {
          console.log("안됨");
        }
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onChangeId = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤, 하드카피
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const onChangePw = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤, 하드카피
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
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
}

export default Admin;

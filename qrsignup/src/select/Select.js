import "./Select.css";

import logo from "../img/kt.png";
import icon from "../img/icon.ico";

import { child, get, set, ref } from "firebase/database";
import { database } from "../firebase";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Select(props) {
  const navigate = useNavigate();
  const dbRef = ref(database);
  let [adminAbout, setAdminAbout] = useState([]);

  useEffect(() => {
    get(child(dbRef, "admin/" + `${sessionStorage.getItem("user_id")}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setAdminAbout(snapshot.val());
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (props.isLogin === false) {
      navigate("/waiting/admin");
      console.log(props.isLogin);
    }
  }); // 세션 유지 여부 확인, 접근 제한

  const onClickLogout = () => {
    // sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
    sessionStorage.removeItem("user_id");
    // App 으로 이동(새로고침)
    document.location.href = "/waiting/admin";
  }; // 로그아웃 기능

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
          <div className="AdminMenu" onClick={() => navigate("/waiting")}>
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
}

export default Select;

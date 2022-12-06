import React from "react";
import AdminPresenter from "./AdminPresenter";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { child, get, ref } from "firebase/database";
import { database } from "../../firebase";

const AdminContainer = ({ sessionCheck }) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    id: "",
    password: "",
  }); // 멀티 인풋 값을 관리하는 state

  const dbRef = ref(database);

  const { id, password } = inputs;

  useEffect(() => {
    if (sessionCheck === true) {
      navigate("/");
    }
  });

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

  const onClick = () => {
    get(child(dbRef, "admin/" + `${inputs.id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          if (snapshot.val().password === inputs.password) {
            sessionStorage.setItem("user_id", inputs.id);
            alert("로그인되었습니다");
          } else {
            alert("비밀번호가 다릅니다");
          }
        } else {
          alert("아이디 또는 비밀번호가 존재하지 않습니다");
        }
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  }; // 로그인(ID 존재여부 확인 및 비밀번호 비교) 기능 실행

  return (
    <AdminPresenter
      {...{ onClick }}
      {...{ id }}
      {...{ password }}
      {...{ onChangeId }}
      {...{ onChangePw }}
    />
  );
};

export default AdminContainer;

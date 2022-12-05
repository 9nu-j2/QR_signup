import SelectPresenter from "./SelectPresenter";

import { child, get, ref } from "firebase/database";
import { database } from "../../firebase";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SelectContainer = ({ sessionCheck }) => {
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
    if (sessionCheck === false) {
      navigate("/waiting");
      console.log(sessionCheck);
    }
  }); // 세션 유지 여부 확인, 접근 제한

  const onClickLogout = () => {
    // sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
    sessionStorage.removeItem("user_id");
    // App 으로 이동(새로고침)
    document.location.href = "/waiting";
  }; // 로그아웃 기능
  return (
    <SelectPresenter
      {...{ adminAbout }}
      {...{ onClickLogout }}
      {...{ navigate }}
    />
  );
};

export default SelectContainer;

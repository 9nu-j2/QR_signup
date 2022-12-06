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
      navigate("/");
    }
  }); // 세션 유지 여부 확인, 접근 제한

  return <SelectPresenter {...{ adminAbout }} {...{ navigate }} />;
};

export default SelectContainer;

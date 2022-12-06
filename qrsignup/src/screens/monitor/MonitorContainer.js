import MonitorPresenter from "./MonitorPresenter";

import { handleDay } from "../../utils/Time";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  getDatabase,
  child,
  get,
  ref,
  update,
  onValue,
} from "firebase/database";
import { database } from "../../firebase";

const MonitorContainer = ({ sessionCheck }) => {
  const navigate = useNavigate();
  const dbRef = ref(database);
  const db = getDatabase();

  const [objectList, setObjectList] = useState([]); // 객체 저장
  let [adminAbout, setAdminAbout] = useState([]);
  let [shopAbout, setShopAbout] = useState([]);
  let [userId, setUserId] = useState("");
  let [shopNow, setShopNow] = useState([]);

  let [sampling, setSampling] = useState(0);
  let [sampling1, setSampling1] = useState(0);
  let [sampling2, setSampling2] = useState(0);

  let [readTrigger, setReadTrigger] = useState(false);

  let [extendModal, extendModalChange] = useState(false);
  let [usingModal, usingModalChange] = useState(false);
  let [notExtendedModal, notExtendedModalChange] = useState(false);
  // 클릭시 모달 오픈/클로즈를 위한 state

  useEffect(() => {
    const resp = ref(db, "admin/" + `${sessionStorage.getItem("user_id")}`);

    onValue(resp, (snapshot) => {
      if (snapshot.exists()) {
        setObjectList(Object.entries(snapshot.val().shop_list));
        setAdminAbout(snapshot.val());
      } else {
      }
    });
  }, [readTrigger]); // 비동기로 처음 컴포넌트 렌더링 시에만 실행되는 hook, admin 정보 조회

  useEffect(() => {
    countFiltering();
  }, [objectList]);

  useEffect(() => {
    if (readTrigger === true) {
      get(child(dbRef, "shop/" + userId))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setShopAbout(snapshot.val());
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [readTrigger]);

  useEffect(() => {
    const updates = {};
    if (readTrigger === true) {
      if (shopNow.isWorking === false && shopNow.status === "onProgress") {
        updates[
          "admin/" +
            `${sessionStorage.getItem("user_id")}` +
            "/shop_list/" +
            userId +
            "/isWorking"
        ] = true;

        updates[
          "admin/" +
            `${sessionStorage.getItem("user_id")}` +
            "/shop_list/" +
            userId +
            "/status"
        ] = "isPermitted";

        updates["shop/" + userId + "/expiryDate"] = handleDay(365);
        update(ref(db), updates);
        setReadTrigger(false);
      } else {
        updates[
          "admin/" +
            `${sessionStorage.getItem("user_id")}` +
            "/shop_list/" +
            userId +
            "/status"
        ] = "isPermitted";

        updates["shop/" + userId + "/expiryDate"] = handleDay(365);
        update(ref(db), updates);
        setReadTrigger(false);
      }
    }
  }, [shopAbout, readTrigger]); // 승인버튼 클릭시 실행

  useEffect(() => {
    if (sessionCheck === false) {
      navigate("/");
    }
  }); // 세션 유지 여부 확인, 접근 제한

  const onClickModal2 = () => {
    usingModalChange(!usingModal);
  };

  const onClickModal3 = () => {
    notExtendedModalChange(!notExtendedModal);
  };

  const countArray = [0, 0, 0];

  const countFiltering = () => {
    objectList.forEach((el) => {
      if (el[1].status === "onProgress") {
        countArray[0]++;
        if (el[1].isWorking === true) {
          countArray[1]++;
        } else if (el[1].isWorking === false) {
          countArray[2]++;
        }
      } else if (el[1].isWorking === true) {
        countArray[1]++;
      } else if (el[1].isWorking === false) {
        countArray[2]++;
      }
    });
    setSampling(countArray[0]);
    setSampling1(countArray[1]);
    setSampling2(countArray[2]);
  };

  function onClickAccept(shop_id) {
    const id = shop_id;
    setUserId(id);
    setReadTrigger(true);
  }
  return (
    <MonitorPresenter
      {...{ setShopNow }}
      {...{ onClickAccept }}
      {...{ adminAbout }}
      {...{ sampling }}
      {...{ extendModal }}
      {...{ objectList }}
      {...{ onClickModal2 }}
      {...{ sampling1 }}
      {...{ usingModal }}
      {...{ sampling2 }}
      {...{ notExtendedModal }}
      {...{ onClickModal3 }}
    />
  );
};

export default MonitorContainer;

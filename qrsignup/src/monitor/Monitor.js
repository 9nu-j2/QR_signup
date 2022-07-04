import "./Monitor.css";
import logo from "../img/kt.png";
import icon from "../img/icon.ico";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { getDatabase, child, get, ref, update } from "firebase/database";
import { database } from "../firebase";

function Monitor(props) {
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

  const [startDate, setStartDate] = useState("");

  let [extendModal, extendModalChange] = useState(false);
  let [usingModal, usingModalChange] = useState(false);
  let [notExtendedModal, notExtendedModalChange] = useState(false);
  // 클릭시 모달 오픈/클로즈를 위한 state

  useEffect(() => {
    get(child(dbRef, "admin/" + `${sessionStorage.getItem("user_id")}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setObjectList(Object.entries(snapshot.val().shop_list));
          setAdminAbout(snapshot.val());
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
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

        updates["shop/" + userId + "/expiryDate"] = _handle60day();
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

        updates["shop/" + userId + "/expiryDate"] = _handle60day();
        update(ref(db), updates);
        setReadTrigger(false);
      }
    }
  }, [shopAbout, readTrigger]); //여기마저 해야함

  useEffect(() => {
    if (props.isLogin === false) {
      navigate("/");
    }
  }); // 세션 유지 여부 확인, 접근 제한

  const onClickLogout = () => {
    // sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
    sessionStorage.removeItem("user_id");
    // App 으로 이동(새로고침)
    document.location.href = "/waiting";
  }; // 로그아웃 기능

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

  const _handle60day = () => {
    const today = new Date();
    today.setDate(today.getDate() + 60);
    console.log(today);

    let year1 = String(today.getFullYear());
    let month1 = String(today.getMonth() + 1);
    let day1 = String(today.getDate());

    let newDate = String(
      year1 +
        (month1.length === 1 ? "0" + month1 : month1) +
        (day1.length === 1 ? "0" + day1 : day1)
    );
    setStartDate(newDate);
    return newDate;
  }; // 시간 계산하자

  function onClickAccept(shop_id) {
    const id = shop_id;
    setUserId(id);
    setReadTrigger(true);
  }

  const ExtendComp = (props) => {
    return (
      <div className="ReqBottom">
        {props.objectList.map((el) => {
          const { name, status } = el[1];
          if (status === "onProgress") {
            setShopNow(el[1]);
            return (
              <div className="ReqList">
                <div className="RLCircle" id="circle1"></div>
                <div className="RLName">
                  <p>{name}</p>
                </div>
                <div className="RLbutton">
                  <button onClick={() => onClickAccept(el[0])}>승인</button>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }; // 승인 요청항목 추출

  const UsingNow = (props) => {
    if (props.usingModal === true) {
      return (
        <div className="ReqBottom">
          {props.objectList.map((el) => {
            const { name, isWorking } = el[1];
            if (isWorking === true) {
              return (
                <div className="ReqList">
                  <div className="RLCircle" id="circle2"></div>
                  <div className="RLName">
                    <p>{name}</p>
                  </div>
                  <div className="RLbutton"></div>
                </div>
              );
            }
          })}
        </div>
      );
    } else {
      return <div></div>;
    }
  }; // 관리중인 가게 목록 출력

  const DontWantExtend = (props) => {
    if (props.notExtendedModal === true) {
      return (
        <div className="ReqBottom">
          {props.objectList.map((el) => {
            const { name, isWorking } = el[1];
            if (isWorking === false) {
              return (
                <div className="ReqList">
                  <div className="RLCircle" id="circle3"></div>
                  <div className="RLName">
                    <p>{name}</p>
                  </div>
                  <div className="RLbutton"></div>
                </div>
              );
            }
          })}
        </div>
      );
    } else {
      return <div></div>;
    }
  }; // 기간 만료 대상 출력

  return (
    <div className="AdminDiv">
      <div className="MonitorDiv">
        <div className="Logo">
          <img src={logo}></img>
        </div>
        <div className="AdminPart">
          <div className="IconBox">
            <img src={icon}></img>
          </div>
          <p className="AboutAdmin">{sessionStorage.getItem("user_id")}</p>
          <p className="AboutAdmin2">{adminAbout.email}</p>
          <button onClick={onClickLogout}>로그아웃</button>
        </div>
        <div className="Notification">
          <div className="NotiBox">
            <div className="ReqTitle">
              <div className="ReqPart1">사용 연장 요청</div>
              <div className="ReqPart2">
                {sampling === 0 ? (
                  <div></div>
                ) : (
                  <div className="ReqTotal">
                    <p>{sampling}</p>
                  </div>
                )}
              </div>
            </div>
            <ExtendComp
              extendModal={extendModal}
              objectList={objectList}
            ></ExtendComp>
          </div>
          <div className="NotiBox">
            <div className="ReqTitle" onClick={onClickModal2}>
              <div className="ReqPart1">사용중인 가게</div>
              <div className="ReqPart2">
                {sampling1 === 0 ? (
                  <div></div>
                ) : (
                  <div className="ReqTotal">
                    <p>{sampling1}</p>
                  </div>
                )}
              </div>
            </div>
            <UsingNow
              usingModal={usingModal}
              objectList={objectList}
            ></UsingNow>
          </div>
          <div className="NotiBox">
            <div className="ReqTitle" onClick={onClickModal3}>
              <div className="ReqPart1">연장하지 않은 가게</div>
              <div className="ReqPart2">
                {sampling2 === 0 ? (
                  <div></div>
                ) : (
                  <div className="ReqTotal">
                    <p>{sampling2}</p>
                  </div>
                )}
              </div>
            </div>
            <DontWantExtend
              notExtendedModal={notExtendedModal}
              objectList={objectList}
            ></DontWantExtend>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Monitor;

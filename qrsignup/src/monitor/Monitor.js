import "./Monitor.css";
import logo from "../img/kt.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { child, get, set, ref } from "firebase/database";
import { database } from "../firebase";

function Monitor(props) {
  const navigate = useNavigate();
  const dbRef = ref(database);

  const [objectList, setObjectList] = useState([]); // 객체 저장

  let [sampling, setSampling] = useState(0);
  let [sampling1, setSampling1] = useState(0);
  let [sampling2, setSampling2] = useState(0);

  let [extendModal, extendModalChange] = useState(false);
  let [usingModal, usingModalChange] = useState(false);
  let [notExtendedModal, notExtendedModalChange] = useState(false);
  // 클릭시 모달 오픈/클로즈를 위한 state

  useEffect(() => {
    get(child(dbRef, "admin/" + `${sessionStorage.getItem("user_id")}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setObjectList(Object.entries(snapshot.val().shop_list));
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // 비동기로 처음 컴포넌트 렌더링 시에만 실행되는 hook, admin 정보 조회

  useEffect(() => {
    countFiltering();
  }, [objectList]);

  useEffect(() => {
    if (props.isLogin === false) {
      navigate("/waiting/admin");
    }
  }); // 세션 유지 여부 확인, 접근 제한

  const onClickLogout = () => {
    // sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
    sessionStorage.removeItem("user_id");
    // App 으로 이동(새로고침)
    document.location.href = "/waiting/admin";
  }; // 로그아웃 기능

  const onClickModal1 = () => {
    extendModalChange(!extendModal);
  };
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
      } else if (el[1].status === "isPermitted") {
        countArray[1]++;
      } else if (el[1].isWorking === false) {
        countArray[2]++;
      }
    });
    setSampling(countArray[0]);
    setSampling1(countArray[1]);
    setSampling2(countArray[2]);
  };

  const extendComp = (props) => {
    if (props.extendModal === true) {
      return (
        <div>
          {props.objectList.map((el) => {
            const { name, status } = el[1];
            if (status === "onProgress") {
              return <div>{name}</div>;
            }
          })}
        </div>
      );
    } else {
      return <div></div>;
    }
  }; // 승인 요청항목 추출

  const usingNow = (props) => {
    if (props.usingModal === true) {
      return (
        <div>
          {props.objectList.map((el) => {
            const { name, status } = el[1];
            if (status === "isPermitted") {
              return <div>{name}</div>;
            }
          })}
        </div>
      );
    } else {
      return <div></div>;
    }
  }; // 관리중인 가게 목록 출력

  const dontWantExtend = (props) => {
    if (props.notExtendedModal === true) {
      return (
        <div>
          {props.objectList.map((el) => {
            const { id, status } = el;
            if (el[1].isWorking === false) {
              return <div>{el[1].name}</div>;
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
          <div className="IconBox"></div>
          <p>관리자 정보(아이디)</p>
          <p>관리자 소속</p>
          <button onClick={onClickLogout}>로그아웃</button>
        </div>
        <div className="Notification">
          <div className="NotiBox">
            <div className="ReqTitle" onClick={onClickModal1}>
              <div>사용 연장 요청</div>
              <div>{sampling}</div>
            </div>
            <extendComp
              extendModal={extendModal}
              objectList={objectList}
            ></extendComp>
          </div>
          <div className="NotiBox">
            <div className="UsingTitle" onClick={onClickModal2}>
              <div>사용중인 가게</div>
              <div>{sampling1}</div>
            </div>
            <usingNow
              usingModal={usingModal}
              objectList={objectList}
            ></usingNow>
          </div>
          <div className="NotiBox">
            <div className="NotExTitle" onClick={onClickModal3}>
              <div>연장하지 않은 가게</div>
              <div>{sampling2}</div>
            </div>
            <dontWantExtend
              notExtendedModal={notExtendedModal}
              objectList={objectList}
            ></dontWantExtend>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Monitor;

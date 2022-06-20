import './Monitor.css';
import logo from '../img/kt.png'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import { child, get, set, ref } from "firebase/database";
import { database } from "../firebase";

function ExtendRequest(props) {
  if(props.extendModal === true){
    return (
      <ul>
        <li>ㅎㅇ</li>
        <li>ㅎㅇ</li>
      </ul>
    );
  }
  else {
    return (
      <div></div>
    );
  }
}; // 승인 요청항목 추출

const UsingNow = (props)=> {
  if(props.usingModal === true){
    return (
      <ul>
        <li>ㅎㅇ</li>
        <li>ㅎㅇ</li>
      </ul>
    );
  }
  else {
    return (
      <div></div>
    );
  }
}; // 관리중인 가게 목록 출력

const DontWantExtend = (props)=> {
  if(props.notExtendedModal === true){
    return (
      <ul>
        <li>ㅎㅇ</li>
        <li>ㅎㅇ</li>
      </ul>
    );
  }
  else {
    return (
      <div></div>
    );
  }
}; // 기간 만료 대상 출력

function Monitor(props) {
  const navigate = useNavigate();
  const dbRef = ref(database);
  let [extendRequest, extendRequestChange] = useState(0);
  let [storeList, storeListChange] = useState(0);
  let [notExtendedList, notExtendedListChange] = useState(0);
  // 리스트 총 계 표시를 위한 state들
  const [objectList, setObjectList] = useState({}); // 객체 저장
  const [datas, setDatas] = useState({
    isWorking: "",
    name: "",
    product: "",
    status: ""
  });

  let [extendModal, extendModalChange] = useState(false);
  let [usingModal, usingModalChange] = useState(false);
  let [notExtendedModal, notExtendedModalChange] = useState(false);
  // 클릭시 모달 오픈/클로즈를 위한 state

  useEffect(()=>{
    get(child(dbRef, 'admin/' + `${sessionStorage.getItem('user_id')}`)).then((snapshot)=>{
      if (snapshot.exists()) {
        setObjectList(snapshot.val().shop_list);
      } else {
        
      }
    }).catch((error) => {
      console.error(error);
    });

  },[]); // 비동기로 처음 컴포넌트 렌더링 시에만 실행되는 hook, admin 정보 조회

  useEffect(()=>{
    if(props.isLogin === false) {
      navigate("/waiting/admin");
      console.log(props.isLogin);
    }
  }) // 세션 유지 여부 확인, 접근 제한
  
  const onClickLogout = ()=>{
    // sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
    sessionStorage.removeItem('user_id');
    // App 으로 이동(새로고침)
    document.location.href = '/waiting/admin';
  } // 로그아웃 기능

  const onClickModal1 = ()=>{
    extendModalChange(!extendModal);
  }
  const onClickModal2 = ()=>{
    usingModalChange(!usingModal);
  }
  const onClickModal3 = ()=>{
    notExtendedModalChange(!notExtendedModal);
  }

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
              <div>{extendRequest}</div>
            </div>
            <ExtendRequest extendModal={extendModal} objectList={objectList}></ExtendRequest>
          </div>
          <div className="NotiBox">
            <div className="UsingTitle" onClick={onClickModal2}>
              <div>사용중인 가게</div>
              <div>{storeList}</div>
            </div>
            <UsingNow usingModal={usingModal} objectList={objectList}></UsingNow>
          </div>
          <div className="NotiBox">
            <div className="NotExTitle" onClick={onClickModal3}>
              <div>연장하지 않은 가게</div>
              <div>{notExtendedList}</div>
            </div>
            <DontWantExtend notExtendedModal={notExtendedModal} objectList={objectList}></DontWantExtend>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Monitor;
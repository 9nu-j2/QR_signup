import './Monitor.css';
import logo from '../img/kt.png'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import { child, get, set, ref } from "firebase/database";
import { database } from "../firebase";

function Monitor(props) {
  const navigate = useNavigate();

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
            <div className="ReqTitle">
              <div>사용 연장 요청</div>
              <div>2</div>
            </div>
            <div>
              <ul>
                <li>ㅎㅇ</li>
                <li>ㅎㅇ</li>
              </ul>
            </div>
          </div>
          <div className="NotiBox">
            <div className="UsingTitle">
              <div>사용중인 가게</div>
              <div>4</div>
            </div>
            <div>
              <ul>
                <li>ㅎㅇ</li>
                <li>ㅎㅇ</li>
              </ul>
            </div>
          </div>
          <div className="NotiBox">
            <div className="NotExTitle">
              <div>연장하지 않은 가게</div>
              <div>1</div>
            </div>
            <div>
              <ul>
                <li>ㅎㅎ</li>
                <li>ㅎㅎ</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Monitor;
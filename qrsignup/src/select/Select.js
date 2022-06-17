import './Select.css';

import logo from '../img/kt.png'

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

function Select(props) {
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
    <div className="Master">
      <div className="Logo">
        <img src={logo}></img>
      </div>
      <div className="Half">
        <div className="IconBox"></div>
        <p>관리자 정보(아이디)</p>
        <p>관리자 소속</p>
        <button onClick={onClickLogout}>로그아웃</button>
      </div>
      <div className="AdminSelect">
        <button><div className="AdminMenu" onClick={()=>navigate("/waiting")}>신규 고객 등록하기</div></button>
        <button><div className="AdminMenu" onClick={()=>navigate("/waiting/monitor")}>승인 요청 확인하기</div></button>
      </div>
    </div>
  );
}


export default Select;
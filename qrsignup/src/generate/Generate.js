import './Generate.css';
import poster from '../img/poster.png';
import QRCode from 'qrcode.react';
import { pin } from '../register/Register';
import { storeName } from '../register/Register';

import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';


function Generate(props) {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: ()=>componentRef.current,
  });

  const onDownloadBtn = () => {
    const card = componentRef.current;
    domtoimage
      .toBlob(card)
      .then((blob) => {
        saveAs(blob, `${storeName}.png`);
      });
  };

  const navigate = useNavigate();
  const isLogin = props.isLogin

  useEffect(()=>{
    if(isLogin === false) {
      navigate("/waiting/admin");
    }
  }) // 세션 유지 여부 확인, 접근 제한
  
  const onClickLogout = ()=>{
    // sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
    sessionStorage.removeItem('user_id')
    // App 으로 이동(새로고침)
    document.location.href = '/waiting/admin';
  } // 로그아웃 기능

  return (
    <div className='All'>
      <div className="Buttons">
          <button className="button-16" onClick={handlePrint}>프린트하기</button>
          <button className="button-16" onClick={onDownloadBtn}>이미지 저장하기</button>
        </div>
      <div className="Div1" ref={componentRef}>
      <img src={poster}></img>
        <div className='Upper'></div>
        <div className='Titlepart'><div className="Store">{storeName}</div></div>
        <div className='mountNode'><QRCode value={"https://qr-waiting-client.netlify.app/" + pin} renderAs="canvas" size={368}/></div>
        <div className='nothing'></div>
      </div>
    </div>
  );
}

export default Generate;